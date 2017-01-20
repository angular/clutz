/**
 * @fileoverview LOUIS main page.
 *
 * This contains further data model classes to extend the basic storage in
 * store.js.  The same lou.uniqueClientKey() call is used to generate client
 * keys for steps, texts, and actions, which are exchanged for server-side keys
 * on save.
 *
 * These classes are used by the Control class to render the UI and manage
 * interactions.
 */

goog.provide("lou.main.Control");
goog.provide("lou.main.module");
goog.require("goog.events.KeyCodes");

goog.require("lou.EntityClass");
goog.require("lou.Field");
goog.require("lou.FrameTable");

goog.require("lou.Syncer");
goog.require("lou.store");
goog.require("lou.sync");

/**
 * Supertype for the frames displayed in the UI.  JSCompiler doesn't have true
 * object subclassing, so we use the AnyFrame_ union to express polymorphism.
 *
 * type: type id, may be "text", "values", "entity", "action", "section"
 *
 * @private @typedef {{
 *     type: !string,
 * }}
 */
lou.main.Frame_;

/**
 * Section heading to divide sections.
 *
 * content: section name
 * operator: user that the section is assigned to
 * display: section should be displayed
 * active: section is the active section, with a Done button
 * next: array of sections which become active when this section is done.
 * stepKey: key for saving this in the database Steps table.
 *
 * @typedef {{
 *     content: !string,
 *     operator: !string,
 *     display: !boolean,
 *     active: !boolean,
 *     next: !Array<lou.main.SectionFrame>,
 *     stepKey: !number,
 * }}
 */
lou.main.SectionFrame;

/**
 * Free form text frame.
 *
 * content: contents of text widget
 * entities: any context entities if this frame is per-entity.
 * See the Lab Workflow Schema doc for more details on entities:
 * http://go/g.d/1ojjKwjRPtQ3lbJt143gBr-_bXLapfxCcJhen6gUEjjY/edit#heading=h.1v4s1ujrqulu
 * fieldKey: key for saving this in the database Fields table.
 *
 * @typedef {{
 *     content: !string,
 *     entities: !Array<lou.EntityClass>,
 *     fieldKey: !number,
 * }}
 */
lou.main.TextFrame;

/**
 * Frame containing values.
 *
 * @private @typedef {{
 *     table: !lou.FrameTable,
 * }}
 */
lou.main.ValuesFrame_;

/**
 * Frame defining an entity class.
 *
 * @private @typedef {{
 *     entity: !lou.EntityClass,
 * }}
 */
lou.main.EntityFrame_;

/**
 * A frame containing one or more action buttons.
 *
 * entities: any context entities if this frame is per-entity.  See detailed
 * comment in louismodel.proto.
 *
 * @private @typedef {{
 *     actions: !Array<lou.main.Action>,
 *     entities: !Array<lou.EntityClass>,
 * }}
 */
lou.main.ActionFrame_;

/**
 * Union type for all frames which can be per-entity.
 *
 * @private @typedef {(
 *     lou.main.TextFrame|
 *     lou.main.ValuesFrame_|
 *     lou.main.ActionFrame_)}
 */
lou.main.FrameWithEntities_;

/**
 * Union type for all frames.
 *
 * @private @typedef {(
 *     lou.main.Frame_|
 *     lou.main.FrameWithEntities_|
 *     lou.main.EntityFrame_|
 *     lou.main.SectionFrame)}
 */
lou.main.AnyFrame_;

/**
 * Sidebar array.
 *
 * isEntityClass: frame will be an EntityFrame_; else a ValuesFrame_
 * label: field name from the ValuesFrame_
 * index: field index in the ValuesFrame_
 *
 * @private @typedef {Array<{
 *     isEntityClass: !boolean,
 *     frame: !lou.main.AnyFrame_,
 *     label: (string|undefined),
 *     index: (number|undefined),
 * }>}
 */
lou.main.Sidebar_;

/**
 * Action definition.
 *
 * name: displayed on the button
 * inputFrames: values which can be affected by this action
 * markedInput: determines if the input row is "marked" in the UI (for deletion)
 * args: argument names, which must match field names in inputFrames
 * formula: (javascript) formula to execute.
 * actionKey: key for saving this in database Actions table.
 * isFrameAnchor: true for the first action of a newly created frame, and the
 *   last action in a frame to be deleted.  Sent to the server to record the
 *   layout accurately.
 *
 * @typedef {{
 *     name: !string,
 *     inputFrames: !Array<lou.main.ValuesFrame_>,
 *     markedInput: !Array<boolean>,
 *     args: !Array<string>,
 *     formula: !string,
 *     actionKey: !number,
 *     isFrameAnchor: !boolean,
 * }}
 */
lou.main.Action;

/**
 * A field has a label and a (string) value.
 *
 * @private @typedef {{
 *     label: string,
 *     value: string,
 * }}
 */
lou.main.Field_;

/**
 * A tab holds the full workflow state, including sidebar configuration and all
 * frames in display order.
 *
 * entityIndexMap - Currently active index of each entity. Indexed by the
 *   entity class key.  This is not part of the store.js classes, so that
 *   different users can view different entities.
 *
 * @typedef {{
 *     title: string,
 *     showAllSections: boolean,
 *     adminMode: boolean,
 *     showSidebar: boolean,
 *     sidebar: !lou.main.Sidebar_,
 *     frames: !Array<lou.main.AnyFrame_>,
 *     entityIndexMap: !Object<number, number>,
 *     syncer: !lou.Syncer,
 * }}
 */
lou.main.Tab;

/**
 * Main controller object.
 *
 * @param {!angular.Scope} $scope The Angular scope for the control.
 * @param {!angular.$http} $http Angular's HTTP service.
 * @param {!md.$dialog} $mdDialog Dialog service.
 * @param {!md.$panel} $mdPanel Angular mdPanel service.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!angular.$parse} $parse Angular's parser service.
 * @param {!angular.$document} $document Angular document service.
 * @param {!angular.$location} $location Angular window service.
 * @param {!angular.Scope} $rootScope The Angular root scope for the control.
 * @constructor @ngInject @export
 */
lou.main.Control = function(
    $scope, $http, $mdDialog, $mdPanel, $timeout, $parse, $document, $location, $rootScope) {
  this.scope = $scope;
  this.http = $http;
  this.mdDialog = $mdDialog;
  this.mdPanel = $mdPanel;
  this.timeout = $timeout;
  this.parse = $parse;
  this.location = $location;
  this.rootScope = $rootScope;

  this.rootScope.openWorkbooks = this.rootScope.openWorkbooks || [];

  /**
   * Array of tabs currently displayed.  Each tab contains a workflow.
   * @export @type {Array<lou.main.Tab>}
   */
  this.tabs = [];

  /**
   * Index of the active tab, set by the md-tabs directive.
   * @export @type {number}
   */
  this.tabIndex = 0;

  /**
   * Index of the active frame, in the active tab.  This is highlighted on the
   * display, and used as a "cursor" for many operations.  For example, new
   * fields and frames will be added just after the cursor position.
   * @export @type {number}
   */
  this.frameIndex = 0;

  /**
   * Table of selected fields.  More than one field can be selected at once, so
   * this is a kept as a map from field index to boolean.
   * @export @type {Object<number, !boolean>}
   */
  this.selectedFieldIndexes = {};

  /**
   * Pivot point for selecting multiple fields; this indicates the last field
   * that was clicked on without the Shift key being depressed.
   * @export @type {number}
   */
  this.selectPivot = 0;

  /**
   * TinyMCE Appearance options.
   * @export
   */
  this.tinyMceOptions = {
    "plugins": "table textcolor link preview paste autoresize autolink charmap contextmenu",
    "tools": "inserttable",
    "paste_as_text": true,
    "resize": true,
    "statusbar": false,
    "inline_styles": false,
    "verify_html": true,
    "toolbar":
        "undo bold italic forecolor styleselect | bullist numlist | table insert",
    "contextmenu": "link image charmap inserttable | cell row column deletetable",
    "target_list": [{title: "New page", value: "_blank"}],
    "relative_urls" : false,
    "remove_script_host" : false,
    "menubar": "file edit insert format",
  };
  var self = this;
  this.rootScope.openWorkbooks.forEach(function(workflow_key) {
    self.loadOrClone(workflow_key);
  });

  // Sets the active tab to the last tab in openWorkbooks. A bit of a work
  // around since md-autoselect was selecting whichever tab was most recently
  // opened from loadOrClone above
  if (this.rootScope.openWorkbooks) {
    this.tabIndex = this.rootScope.openWorkbooks.length-1;
  }
};

/**
 * Adds a field values frame.
 *
 * @type {function(angular.Scope.Event)}
 * @export
 */
lou.main.Control.prototype.addValuesFrame = function(ev) {
  var confirm = this.mdDialog.prompt()
      .title("Add Fields")
      .textContent("Enter field names (comma-separated)")
      .placeholder("names")
      .ariaLabel("names")
      .initialValue("")
      .targetEvent(ev)
      .ok("Add")
      .cancel("Cancel");
  this.mdDialog.show(confirm).then(goog.bind(function(names) {

    this.fieldIndexes = {};
  }, this));
};
