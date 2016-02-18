declare namespace ಠ_ಠ.clutz.type_renaming_with_externs {
  var args : Arguments ;
  var arrayLike : IArrayLike < number > ;
  var thenable : IThenable < string > ;
}
declare namespace ಠ_ಠ.clutz.goog {
  function require(name: 'type_renaming_with_externs'): typeof ಠ_ಠ.clutz.type_renaming_with_externs;
}
declare module 'goog:type_renaming_with_externs' {
  import alias = ಠ_ಠ.clutz.type_renaming_with_externs;
  export = alias;
}
declare namespace ಠ_ಠ.clutz {
  interface IObject < KEY1 , VALUE1 > {
  }
}
declare namespace ಠ_ಠ.clutz {
  interface IArrayLike < VALUE2 > extends IObject < number , VALUE2 > {
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Arguments extends Arguments_Instance {
  }
  class Arguments_Instance implements IArrayLike < any > {
    private noStructuralTyping_: any;
    callee : ( ...a : any [] ) => any ;
    /**
     * Use the non-standard {@see Function.prototype.caller} property of a function
     * object instead.
     */
    caller : ( ...a : any [] ) => any ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * A object property descriptor used by Object.create, Object.defineProperty,
   * Object.defineProperties, Object.getOwnPropertyDescriptor.
   *
   * Note: not a real constructor.
   */
  class ObjectPropertyDescriptor extends ObjectPropertyDescriptor_Instance {
  }
  class ObjectPropertyDescriptor_Instance {
    private noStructuralTyping_: any;
    configurable : boolean ;
    enumerable : boolean ;
    get : ( ) => any ;
    set : (a : any ) => void ;
    value : any ;
    writable : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * A fake type to model the JSON object.
   */
  class JSONType extends JSONType_Instance {
  }
  class JSONType_Instance {
    private noStructuralTyping_: any;
    parse (jsonStr : string , opt_reviver ? : (a : string , b : any ) => any ) : any ;
    stringify (jsonObj : any , opt_replacer ? : string [] | ( (a : string , b : any ) => any ) , opt_space ? : number | string ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Iterable < VALUE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Iterator < VALUE > {
    next (a ? : VALUE ) : { done : boolean , value : VALUE } ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Use this to indicate a type is both an Iterator and an Iterable.
   */
  interface IteratorIterable < T > extends Iterator < T > , Iterable < T > {
  }
}
declare namespace ಠ_ಠ.clutz {
  class Generator < VALUE > extends Generator_Instance < VALUE > {
  }
  class Generator_Instance < VALUE > implements Iterator < VALUE > {
    private noStructuralTyping_: any;
    next (opt_value ? : any ) : { done : boolean , value : VALUE } ;
    return (value : VALUE ) : { done : boolean , value : VALUE } ;
    throw (exception : any ) : { done : boolean , value : VALUE } ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Transferable {
  }
}
declare namespace ಠ_ಠ.clutz {
  class ArrayBuffer extends ArrayBuffer_Instance {
  }
  class ArrayBuffer_Instance implements Transferable {
    private noStructuralTyping_: any;
    constructor (length : number ) ;
    byteLength : number ;
    slice (begin : number , opt_end ? : number ) : ArrayBuffer ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ArrayBufferView extends ArrayBufferView_Instance {
  }
  class ArrayBufferView_Instance {
    private noStructuralTyping_: any;
    buffer : ArrayBuffer ;
    byteLength : number ;
    byteOffset : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * An artificial interface to describe methods available on all TypedArray
   * objects so that they can be operated on in type safe but generic way.
   */
  interface ITypedArray extends IArrayLike < number > {
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : ITypedArray ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : ITypedArray ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Int8Array extends Int8Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Int8Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Int8Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Int8Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Uint8Array extends Uint8Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Uint8Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Uint8Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Uint8Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Uint8ClampedArray extends Uint8ClampedArray_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Uint8ClampedArray_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Uint8ClampedArray ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Uint8ClampedArray ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Int16Array extends Int16Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Int16Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Int16Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Int16Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Uint16Array extends Uint16Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Uint16Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Uint16Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Uint16Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Int32Array extends Int32Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Int32Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Int32Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Int32Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Uint32Array extends Uint32Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Uint32Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Uint32Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Uint32Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Float32Array extends Float32Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Float32Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Float32Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Float32Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Float64Array extends Float64Array_Instance {
    static BYTES_PER_ELEMENT : number ;
  }
  class Float64Array_Instance extends ArrayBufferView_Instance implements ITypedArray {
    constructor (length : number | ArrayBufferView | number [] | ArrayBuffer , opt_byteOffset ? : number , opt_length ? : number ) ;
    BYTES_PER_ELEMENT : number ;
    fill (value : number , opt_begin ? : number , opt_end ? : number ) : Float64Array ;
    length : number ;
    set (array : ArrayBufferView | number [] , opt_offset ? : number ) : any ;
    subarray (begin : number , opt_end ? : number ) : Float64Array ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DataView extends DataView_Instance {
  }
  class DataView_Instance extends ArrayBufferView_Instance {
    constructor (buffer : ArrayBuffer , opt_byteOffset ? : number , opt_byteLength ? : number ) ;
    getFloat32 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getFloat64 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getInt16 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getInt32 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getInt8 (byteOffset : number ) : number ;
    getUint16 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getUint32 (byteOffset : number , opt_littleEndian ? : boolean ) : number ;
    getUint8 (byteOffset : number ) : number ;
    setFloat32 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setFloat64 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setInt16 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setInt32 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setInt8 (byteOffset : number , value : number ) : any ;
    setUint16 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setUint32 (byteOffset : number , value : number , opt_littleEndian ? : boolean ) : any ;
    setUint8 (byteOffset : number , value : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * This is not an official DOM interface. It is used to add generic typing
   * and respective type inference where available.
   * {@see goog.Thenable} inherits from this making all promises
   * interoperate.
   */
  interface IThenable < TYPE > {
    then < VALUE , RESULT > (opt_onFulfilled ? : (a : TYPE ) => VALUE , opt_onRejected ? : (a : any ) => any ) : RESULT ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Promise < TYPE > extends Promise_Instance < TYPE > {
    static all < T > (iterable : ( T | Promise < T > ) [] ) : Promise < T [] > ;
    static race < T > (iterable : T [] ) : Promise < T > ;
    static reject (opt_error ? : any ) : Promise < any > ;
    static resolve < VALUE , RESULT > (opt_value ? : VALUE ) : RESULT ;
  }
  class Promise_Instance < TYPE > implements IThenable < TYPE > {
    private noStructuralTyping_: any;
    constructor (resolver : (a : (a ? : TYPE | IThenable < TYPE > | { then : any } ) => any , b : (a ? : any ) => any ) => any ) ;
    catch < RESULT > (onRejected : (a : any ) => RESULT ) : Promise < RESULT > ;
    then < VALUE , RESULT > (opt_onFulfilled ? : (a : TYPE ) => VALUE , opt_onRejected ? : (a : any ) => any ) : RESULT ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Map < KEY , VALUE > extends Map_Instance < KEY , VALUE > {
  }
  class Map_Instance < KEY , VALUE > implements Iterable < ( KEY | VALUE ) [] > {
    private noStructuralTyping_: any;
    constructor (opt_iterable ? : Iterable < ( KEY | VALUE ) [] > | ( KEY | VALUE ) [] [] ) ;
    clear ( ) : void ;
    delete (a : KEY ) : boolean ;
    entries ( ) : IteratorIterable < ( KEY | VALUE ) [] > ;
    forEach < MAP , THIS > (a : (a : VALUE , b : KEY , c : MAP ) => void , b ? : THIS ) : any ;
    get (a : KEY ) : VALUE ;
    has (a : KEY ) : boolean ;
    keys ( ) : IteratorIterable < KEY > ;
    set < THIS > (a : KEY , b : VALUE ) : THIS ;
    size : number ;
    values ( ) : IteratorIterable < VALUE > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WeakMap < KEY , VALUE > extends WeakMap_Instance < KEY , VALUE > {
  }
  class WeakMap_Instance < KEY , VALUE > {
    private noStructuralTyping_: any;
    constructor (opt_iterable ? : Iterable < ( KEY | VALUE ) [] > | ( KEY | VALUE ) [] [] ) ;
    clear ( ) : void ;
    delete (a : KEY ) : boolean ;
    get (a : KEY ) : VALUE ;
    has (a : KEY ) : boolean ;
    set < THIS > (a : KEY , b : VALUE ) : THIS ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Set < VALUE > extends Set_Instance < VALUE > {
  }
  class Set_Instance < VALUE > implements Iterable < VALUE > {
    private noStructuralTyping_: any;
    constructor (opt_iterable ? : Iterable < VALUE > | VALUE [] ) ;
    add < THIS > (a : VALUE ) : THIS ;
    clear ( ) : void ;
    delete (a : VALUE ) : boolean ;
    entries ( ) : IteratorIterable < VALUE [] > ;
    forEach < SET , THIS > (a : (a : VALUE , b : VALUE , c : SET ) => any , b ? : THIS ) : any ;
    has (a : VALUE ) : boolean ;
    keys ( ) : IteratorIterable < VALUE > ;
    size : number ;
    values ( ) : IteratorIterable < VALUE > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WeakSet < VALUE > extends WeakSet_Instance < VALUE > {
  }
  class WeakSet_Instance < VALUE > {
    private noStructuralTyping_: any;
    constructor (opt_iterable ? : Iterable < VALUE > | VALUE [] ) ;
    add < THIS > (a : VALUE ) : THIS ;
    clear ( ) : void ;
    delete (a : VALUE ) : boolean ;
    has (a : VALUE ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz.Intl {
  /**
   * NOTE: this API is not from ecma402 and is subject to change.
   */
  class v8BreakIterator extends v8BreakIterator_Instance {
  }
  class v8BreakIterator_Instance {
    private noStructuralTyping_: any;
    /**
     * NOTE: this API is not from ecma402 and is subject to change.
     */
    constructor (opt_locales ? : string | string [] , opt_options ? : { type ? : string } ) ;
    adoptText (text : string ) : any ;
    breakType ( ) : string ;
    current ( ) : number ;
    first ( ) : number ;
    next ( ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.Intl {
  class Collator extends Collator_Instance {
    static supportedLocalesOf (locales : string [] , opt_options ? : { localeMatcher ? : string } ) : any ;
  }
  class Collator_Instance {
    private noStructuralTyping_: any;
    constructor (opt_locales ? : string | string [] , opt_options ? : { caseFirst ? : string , ignorePunctuation ? : boolean , localeMatcher ? : string , numeric ? : boolean , sensitivity ? : string , usage ? : string } ) ;
    compare (arg1 : string , arg2 : string ) : number ;
    resolvedOptions ( ) : { caseFirst : string , collation : string , ignorePunctuation : boolean , locale : string , numeric : boolean , sensitivity : string , usage : string } ;
  }
}
declare namespace ಠ_ಠ.clutz.Intl {
  class NumberFormat extends NumberFormat_Instance {
    static supportedLocalesOf (locales : string [] , opt_options ? : { localeMatcher ? : string } ) : any ;
  }
  class NumberFormat_Instance {
    private noStructuralTyping_: any;
    constructor (opt_locales ? : string | string [] , opt_options ? : { currency ? : string , currencyDisplay ? : string , localeMatcher ? : string , maximumFractionDigits ? : number , maximumSignificantDigits ? : number , minimumFractionDigits ? : number , minimumIntegerDigits ? : number , minimumSignificantDigits ? : number , numberingSystem ? : string , style ? : string , useGrouping ? : boolean } ) ;
    format (num : number ) : string ;
    resolvedOptions ( ) : { currency ? : string , currencyDisplay ? : string , locale : string , maximumFractionDigits : number , maximumSignificantDigits : number , minimumFractionDigits : number , minimumIntegerDigits : number , minimumSignificantDigits : number , numberingSystem : string , style : string , useGrouping : boolean } ;
  }
}
declare namespace ಠ_ಠ.clutz.Intl {
  class DateTimeFormat extends DateTimeFormat_Instance {
    static supportedLocalesOf (locales : string [] , opt_options ? : { localeMatcher : string } ) : any ;
  }
  class DateTimeFormat_Instance {
    private noStructuralTyping_: any;
    constructor (opt_locales ? : string | string [] , opt_options ? : { calendar ? : string , day ? : string , era ? : string , formatMatcher ? : string , hour ? : string , hour12 ? : boolean , localeMatcher ? : string , minute ? : string , month ? : string , numberingSystem ? : string , second ? : string , timeZoneName ? : string , tz ? : string , weekday ? : string , year ? : string } ) ;
    format (date ? : Date | number ) : string ;
    resolvedOptions ( ) : { calendar : string , day ? : string , era ? : string , hour ? : string , hour12 ? : boolean , locale : string , minute ? : string , month ? : string , numberingSystem : string , second ? : string , timeZone ? : string , timeZoneName ? : string , weekday ? : string , year ? : string } ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface EventTarget {
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , useCapture : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , useCapture : boolean ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface EventListener {
    handleEvent (evt : Event ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Event extends Event_Instance {
    static AT_TARGET : number ;
    static BUBBLING_PHASE : number ;
    static CAPTURING_PHASE : number ;
  }
  class Event_Instance {
    private noStructuralTyping_: any;
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean } ) ;
    Abstract : string ;
    Banner : string ;
    HORIZONTAL_AXIS : number ;
    MoreInfo : string ;
    VERTICAL_AXIS : number ;
    altKey : boolean ;
    altLeft : boolean ;
    axis : number ;
    bubbles : boolean ;
    button : number ;
    cancelBubble : boolean ;
    cancelable : boolean ;
    charCode : number ;
    clientX : number ;
    clientY : number ;
    /**
     * A ClipboardData on IE, but a DataTransfer on WebKit.
     */
    clipboardData : ClipboardData ;
    contentOverflow : boolean ;
    ctrlKey : boolean ;
    ctrlLeft : boolean ;
    currentTarget : EventTarget ;
    dataFld : string ;
    defaultPrevented : boolean ;
    domain : any ;
    eventPhase : number ;
    explicitOriginalTarget : EventTarget ;
    fromElement : Element ;
    initEvent (eventTypeArg : string , canBubbleArg : boolean , cancelableArg : boolean ) : void ;
    initKeyEvent : any ;
    initMessageEvent : any ;
    initMouseEvent : any ;
    initUIEvent : any ;
    isChar : boolean ;
    isTrusted : boolean ;
    keyCode : number ;
    layerX : number ;
    layerY : number ;
    metaKey : boolean ;
    namespaceURI : string ;
    nextPage : string ;
    offsetX : number ;
    offsetY : number ;
    originalTarget : EventTarget ;
    pageX : number ;
    pageY : number ;
    /**
     * Present for events spawned in browsers that support shadow dom.
     */
    path : Element [] ;
    preventBubble : any ;
    preventCapture : any ;
    preventDefault ( ) : void ;
    propertyName : string ;
    qualifier : string ;
    reason : number ;
    recordset : { [ /* warning: coerced from ? */ s: string ]: any } ;
    relatedTarget : EventTarget ;
    repeat : boolean ;
    returnValue : boolean | string ;
    saveType : string ;
    scheme : any ;
    screenX : number ;
    screenY : number ;
    shiftKey : boolean ;
    shiftLeft : boolean ;
    source : Window ;
    srcElement : Element ;
    srcFilter : any ;
    srcUrn : string ;
    stopImmediatePropagation ( ) : void ;
    stopPropagation ( ) : void ;
    target : EventTarget ;
    timeStamp : number ;
    toElement : Element ;
    type : string ;
    userName : any ;
    view : Window ;
    wheelDelta : number ;
    wheelDeltaX : number ;
    wheelDeltaY : number ;
    which : number ;
    x : number ;
    y : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CustomEvent extends CustomEvent_Instance {
  }
  class CustomEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean , detail : any } ) ;
    detail : any ;
    initCustomEvent (eventType : string , bubbles : boolean , cancelable : boolean , detail : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface DocumentEvent {
    createEvent (eventType : string ) : Event ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class UIEvent extends UIEvent_Instance {
  }
  class UIEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean , detail ? : number , view ? : Window } ) ;
    detail : number ;
    initUIEvent : (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , viewArg : Window , detailArg : number ) => void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MouseEvent extends MouseEvent_Instance {
  }
  class MouseEvent_Instance extends UIEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { altKey ? : boolean , bubbles ? : boolean , button ? : number , buttons ? : number , cancelable ? : boolean , clientX ? : number , clientY ? : number , ctrlKey ? : boolean , detail ? : number , metaKey ? : boolean , relatedTarget ? : EventTarget , screenX ? : number , screenY ? : number , shiftKey ? : boolean , view ? : Window } ) ;
    altKey : boolean ;
    button : number ;
    buttons : number ;
    clientX : number ;
    clientY : number ;
    ctrlKey : boolean ;
    /**
     * Addition for accessing clipboard file data that are part of the proposed
     * HTML5 spec.
     */
    dataTransfer : DataTransfer ;
    metaKey : boolean ;
    offsetX : number ;
    offsetY : number ;
    pageX : number ;
    pageY : number ;
    relatedTarget : EventTarget ;
    screenX : number ;
    screenY : number ;
    shiftKey : boolean ;
    x : number ;
    y : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MutationEvent extends MutationEvent_Instance {
  }
  class MutationEvent_Instance extends Event_Instance {
    attrChange : number ;
    attrName : string ;
    initMutationEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , relatedNodeArg : Node , prevValueArg : string , newValueArg : string , attrNameArg : string , attrChangeArg : number ) : void ;
    newValue : string ;
    prevValue : string ;
    relatedNode : Node ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class KeyboardEvent extends KeyboardEvent_Instance {
  }
  class KeyboardEvent_Instance extends UIEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { altKey ? : boolean , bubbles ? : boolean , cancelable ? : boolean , char ? : string , code ? : string , ctrlKey ? : boolean , detail ? : number , key ? : string , locale ? : string , location ? : number , metaKey ? : boolean , repeat ? : boolean , shiftKey ? : boolean , view ? : Window } ) ;
    altKey : boolean ;
    char : string ;
    ctrlKey : boolean ;
    getModifierState (keyIdentifierArg : string ) : boolean ;
    initKeyboardEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , viewArg : Window , keyIdentifierArg : string , keyLocationArg : number , modifiersList : string ) : any ;
    key : string ;
    keyIdentifier : string ;
    locale : string ;
    location : number ;
    metaKey : boolean ;
    repeat : boolean ;
    shiftKey : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The FocusEvent interface provides specific contextual information associated
   * with Focus events.
   * http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent
   */
  class FocusEvent extends FocusEvent_Instance {
  }
  class FocusEvent_Instance extends UIEvent_Instance {
    /**
     * The FocusEvent interface provides specific contextual information associated
     * with Focus events.
     * http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent
     */
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean , detail ? : number , relatedTarget ? : EventTarget , view ? : Window } ) ;
    relatedTarget : EventTarget ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class nsIDOMPageTransitionEvent extends nsIDOMPageTransitionEvent_Instance {
  }
  class nsIDOMPageTransitionEvent_Instance {
    private noStructuralTyping_: any;
    persisted : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MSPointerPoint extends MSPointerPoint_Instance {
  }
  class MSPointerPoint_Instance {
    private noStructuralTyping_: any;
    pointerId : number ;
    pointerType : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MSPointerEvent extends MSPointerEvent_Instance {
    static MSPOINTER_TYPE_MOUSE : number ;
    static MSPOINTER_TYPE_PEN : number ;
    static MSPOINTER_TYPE_TOUCH : number ;
  }
  class MSPointerEvent_Instance extends Event_Instance {
    height : number ;
    hwTimestamp : number ;
    initPointerEvent (a : string , b : boolean , c : boolean , d : Window , e : number , f : number , g : number , h : number , i : number , j : boolean , k : boolean , l : boolean , m : boolean , n : number , o : Element , p : number , q : number , r : number , s : number , t : number , u : number , v : number , w : number , x : number , y : number , z : number , A : boolean ) : void ;
    isPrimary : boolean ;
    msReleasePointerCapture (a : number ) : void ;
    msSetPointerCapture (a : number ) : void ;
    pointerId : number ;
    pointerType : number ;
    pressure : number ;
    rotation : number ;
    tiltX : number ;
    tiltY : number ;
    timeStamp : number ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MSGesture extends MSGesture_Instance {
  }
  class MSGesture_Instance {
    private noStructuralTyping_: any;
    addPointer (pointerId : number ) : any ;
    stop ( ) : any ;
    target : Element ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MSGestureEvent extends MSGestureEvent_Instance {
  }
  class MSGestureEvent_Instance extends Event_Instance {
    expansion : number ;
    gestureObject : MSGesture ;
    hwTimestamp : number ;
    initGestureEvent (a : string , b : boolean , c : boolean , d : Window , e : number , f : number , g : number , h : number , i : number , j : number , k : number , l : number , m : number , n : number , o : number , p : number , q : number , r : number , s : number , t : number , u : number , v : EventTarget ) : void ;
    rotation : number ;
    scale : number ;
    translationX : number ;
    translationY : number ;
    velocityAngular : number ;
    velocityExpansion : number ;
    velocityX : number ;
    velocityY : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebKitAnimationEvent extends WebKitAnimationEvent_Instance {
  }
  class WebKitAnimationEvent_Instance extends Event_Instance {
    animationName : string ;
    elapsedTime : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DeviceOrientationEvent extends DeviceOrientationEvent_Instance {
  }
  class DeviceOrientationEvent_Instance extends Event_Instance {
    absolute : boolean ;
    alpha : number ;
    beta : number ;
    gamma : number ;
    webkitCompassAccuracy : number ;
    webkitCompassHeading : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DeviceAcceleration extends DeviceAcceleration_Instance {
  }
  class DeviceAcceleration_Instance {
    private noStructuralTyping_: any;
    x : number ;
    y : number ;
    z : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DeviceRotationRate extends DeviceRotationRate_Instance {
  }
  class DeviceRotationRate_Instance {
    private noStructuralTyping_: any;
    alpha : number ;
    beta : number ;
    gamma : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DeviceMotionEvent extends DeviceMotionEvent_Instance {
  }
  class DeviceMotionEvent_Instance extends Event_Instance {
    acceleration : DeviceAcceleration ;
    accelerationIncludingGravity : DeviceAcceleration ;
    interval : number ;
    rotationRate : DeviceRotationRate ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMException extends DOMException_Instance {
    static DOMSTRING_SIZE_ERR : number ;
    static HIERARCHY_REQUEST_ERR : number ;
    static INDEX_SIZE_ERR : number ;
    static INUSE_ATTRIBUTE_ERR : number ;
    static INVALID_ACCESS_ERR : number ;
    static INVALID_CHARACTER_ERR : number ;
    static INVALID_MODIFICATION_ERR : number ;
    static INVALID_STATE_ERR : number ;
    static NAMESPACE_ERR : number ;
    static NOT_FOUND_ERR : number ;
    static NOT_SUPPORTED_ERR : number ;
    static NO_DATA_ALLOWED_ERR : number ;
    static NO_MODIFICATION_ALLOWED_ERR : number ;
    static SYNTAX_ERR : number ;
    static TYPE_MISMATCH_ERR : number ;
    static VALIDATION_ERR : number ;
    static WRONG_DOCUMENT_ERR : number ;
  }
  class DOMException_Instance {
    private noStructuralTyping_: any;
    code : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ExceptionCode extends ExceptionCode_Instance {
  }
  class ExceptionCode_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMImplementation extends DOMImplementation_Instance {
  }
  class DOMImplementation_Instance {
    private noStructuralTyping_: any;
    createDocument (namespaceURI : string , publicId : string , doctype : DocumentType ) : Document ;
    createDocumentType (qualifiedName : string , publicId : string , systemId : string ) : DocumentType ;
    createHTMLDocument (opt_title ? : string ) : HTMLDocument ;
    getFeature (feature : string , version : string ) : Object ;
    hasFeature (feature : string , version : string ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Node extends Node_Instance {
    static ATTRIBUTE_NODE : number ;
    static CDATA_SECTION_NODE : number ;
    static COMMENT_NODE : number ;
    static DOCUMENT_FRAGMENT_NODE : number ;
    static DOCUMENT_NODE : number ;
    static DOCUMENT_POSITION_CONTAINED_BY : number ;
    static DOCUMENT_POSITION_CONTAINS : number ;
    static DOCUMENT_POSITION_DISCONNECTED : number ;
    static DOCUMENT_POSITION_FOLLOWING : number ;
    static DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : number ;
    static DOCUMENT_POSITION_PRECEDING : number ;
    static DOCUMENT_TYPE_NODE : number ;
    static ELEMENT_NODE : number ;
    static ENTITY_NODE : number ;
    static ENTITY_REFERENCE_NODE : number ;
    static NOTATION_NODE : number ;
    static PROCESSING_INSTRUCTION_NODE : number ;
    static TEXT_NODE : number ;
    static XPATH_NAMESPACE_NODE : number ;
  }
  class Node_Instance implements EventTarget {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    appendChild (newChild : Node ) : Node ;
    attributes : NamedNodeMap ;
    baseName : string ;
    baseURI : string ;
    childNodes : NodeList ;
    cloneNode (deep : boolean ) : Node ;
    compareDocumentPosition (other : Node ) : number ;
    /**
     * Note: In IE, the contains() method only exists on Elements, not Nodes.
     * Therefore, it is recommended that you use the Conformance framework to
     * prevent calling this on Nodes which are not Elements.
     * @param n The node to check
     */
    contains (n : Node ) : boolean ;
    dataType : string ;
    definition : Node ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * IE5 used document instead of ownerDocument.
     * Old versions of WebKit used document instead of contentDocument.
     */
    document : Document ;
    firstChild : Node ;
    getFeature (feature : string , version : string ) : Object ;
    getUserData (key : string ) : Object ;
    hasAttributes ( ) : boolean ;
    hasChildNodes ( ) : boolean ;
    /**
     * Inserts the given HTML text into the element at the location.
     * @param sWhere Where to insert the HTML text, one of 'beforeBegin', 'afterBegin', 'beforeEnd', 'afterEnd'.
     * @param sText HTML text to insert.
     */
    insertAdjacentHTML (sWhere : string , sText : string ) : any ;
    insertBefore (newChild : Node , refChild : Node ) : Node ;
    isDefaultNamespace (namespaceURI : string ) : boolean ;
    isEqualNode (arg : Node ) : boolean ;
    isSameNode (other : Node ) : boolean ;
    isSupported (feature : string , version : string ) : boolean ;
    lastChild : Node ;
    localName : string ;
    lookupNamespaceURI (prefix : string ) : string ;
    lookupPrefix (namespaceURI : string ) : string ;
    namespaceURI : string ;
    nextSibling : Node ;
    nodeName : string ;
    nodeType : number ;
    nodeTypeString : string ;
    nodeTypedValue : any ;
    nodeValue : string ;
    normalize ( ) : void ;
    ownerDocument : Document ;
    parentElement : Element ;
    parentNode : Node ;
    parsed : boolean ;
    prefix : string ;
    previousSibling : Node ;
    querySelector (query : string ) : Node ;
    querySelectorAll (query : string ) : NodeList ;
    removeChild (oldChild : Node ) : Node ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    removeNode (opt_bRemoveChildren ? : boolean ) : Node ;
    replaceChild (newChild : Node , oldChild : Node ) : Node ;
    selectNodes (expression : string ) : NodeList ;
    selectSingleNode (expression : string ) : Node ;
    setUserData (key : Object , data : Object , handler : UserDataHandler ) : Object ;
    specified : boolean ;
    text : string ;
    textContent : string ;
    transformNode (stylesheet : Node ) : string ;
    transformNodeToObject (stylesheet : Node , outputObject : Object ) : any ;
    xml : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DocumentFragment extends DocumentFragment_Instance {
  }
  class DocumentFragment_Instance extends Node_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class Document extends Document_Instance {
  }
  class Document_Instance extends Node_Instance {
    URL : string ;
    URLUnencoded : any ;
    XMLDocument : any ;
    XSLDocument : any ;
    activeElement : any ;
    adoptNode (externalNode : Node ) : Node ;
    alinkColor : string ;
    all : any ;
    anchors : HTMLCollection ;
    applets : HTMLCollection ;
    async : boolean ;
    attachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    baseURI : string ;
    bgColor : string ;
    body : HTMLBodyElement ;
    caretPositionFromPoint (x : number , y : number ) : CaretPosition ;
    characterSet : any ;
    charset : any ;
    clear ( ) : any ;
    close : any ;
    compatMode : string ;
    contentType : any ;
    cookie : string ;
    createAttribute (name : string ) : Attr ;
    createCDATASection (data : string ) : CDATASection ;
    createComment (data : string ) : Comment ;
    createDocumentFragment ( ) : DocumentFragment ;
    /**
     * Create a DOM element.
     *
     * Web components introduced the second parameter as a way of extending existing
     * tags (e.g. document.createElement('button', 'fancy-button')).
     */
    createElement (tagName : string , opt_typeExtension ? : string ) : Element ;
    createElementNS (namespaceURI : string , qualifiedName : string , opt_typeExtension ? : string ) : Element ;
    createEntityReference (name : string ) : EntityReference ;
    createEvent (type : string ) : Event ;
    createEventObject : any ;
    createNSResolver : any ;
    createProcessingInstruction (target : string , data : string ) : ProcessingInstruction ;
    createRange ( ) : Range ;
    createStyleSheet : any ;
    createTextNode (data : number | string ) : Text ;
    /**
     * Creates a new Touch object.
     */
    createTouch (view : Window , target : EventTarget , identifier : number , pageX : number , pageY : number , screenX : number , screenY : number ) : Touch ;
    /**
     * Creates a new TouchList object.
     */
    createTouchList (touches : ( Touch ) [] ) : TouchList ;
    createTreeWalker : any ;
    currentScript : any ;
    defaultCharset : any ;
    defaultView : any ;
    designMode : string ;
    detachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    dir : any ;
    doctype : DocumentType ;
    documentElement : Element ;
    documentMode : any ;
    documentURI : string ;
    documentURIObject : any ;
    domConfig : DOMConfiguration ;
    domain : string ;
    elementFromPoint (x : number , y : number ) : Element ;
    embeds : HTMLCollection ;
    evaluate : any ;
    execCommand (a : string , b ? : boolean , c ? : any ) : any ;
    exitFullscreen ( ) : any ;
    expando : any ;
    fgColor : string ;
    fileCreatedDate : any ;
    fileModifiedDate : any ;
    fileSize : any ;
    firstChild : Element ;
    focus : any ;
    fonts : FontFaceSet ;
    forms : HTMLCollection ;
    frames : any ;
    fullscreenElement : Element ;
    fullscreenEnabled : boolean ;
    getBoxObjectFor (element : any ) : BoxObject ;
    getCSSCanvasContext (contextId : string , name : string , width : number , height : number ) : any ;
    getElementById (s : string ) : Element ;
    getElementsByClassName (name : string ) : NodeList ;
    getElementsByName (name : string ) : NodeList ;
    getElementsByTagName (tagname : string ) : NodeList ;
    getElementsByTagNameNS (namespace : string , name : string ) : NodeList ;
    hasFocus ( ) : boolean ;
    /**
     * Document head accessor.
     */
    head : HTMLHeadElement ;
    height : number ;
    hidden : boolean ;
    images : HTMLCollection ;
    implementation : DOMImplementation ;
    importNode (externalNode : Node , deep : boolean ) : Node ;
    inputEncoding : string ;
    lastModified : string ;
    linkColor : string ;
    links : HTMLCollection ;
    load : (uri : string ) => any ;
    loadOverlay : any ;
    loadXML : any ;
    location : Location ;
    mergeAttributes : any ;
    mozCancelFullScreen ( ) : any ;
    mozFullScreen : boolean ;
    mozFullScreenElement : Element ;
    mozFullScreenEnabled : boolean ;
    mozHidden : boolean ;
    mozVisibilityState : string ;
    msFullscreenElement : Element ;
    msFullscreenEnabled : boolean ;
    msHidden : boolean ;
    msVisibilityState : string ;
    namespaces : any ;
    nodePrincipal : any ;
    normalizeDocument ( ) : void ;
    onoffline : any ;
    ononline : any ;
    open : any ;
    parentWindow : any ;
    plugins : any ;
    popupNode : any ;
    /**
     * The postMessage method (as implemented in Opera).
     */
    postMessage (message : string ) : any ;
    protocol : any ;
    queryCommandEnabled : any ;
    queryCommandIndeterm : any ;
    queryCommandState : any ;
    queryCommandSupported (a : string ) : any ;
    queryCommandValue : any ;
    querySelector (selectors : string ) : Element ;
    querySelectorAll (selectors : string ) : NodeList ;
    recalc : any ;
    referrer : string ;
    /**
     * This method is deprecated and should be removed by the end of 2014.
     */
    register (a : string , b : { extends ? : string , prototype ? : Object } ) : any ;
    registerElement (a : string , b ? : { extends ? : string , prototype ? : Object } ) : ( ...a : any [] ) => any ;
    releaseCapture : any ;
    renameNode (n : Node , namespaceURI : string , qualifiedName : string ) : Node ;
    scripts : any ;
    scrollingElement : Element ;
    selection : Selection ;
    setActive : any ;
    strictErrorChecking : boolean ;
    styleSheets : StyleSheetList ;
    title : string ;
    tooltipNode : any ;
    uniqueID : any ;
    visibilityState : VisibilityState ;
    vlinkColor : string ;
    webkitCancelFullScreen ( ) : any ;
    webkitCurrentFullScreenElement : Element ;
    webkitFullScreenKeyboardInputAllowed : boolean ;
    webkitFullscreenElement : Element ;
    webkitHidden : boolean ;
    webkitIsFullScreen : boolean ;
    webkitVisibilityState : string ;
    width : number ;
    write (text : string ) : any ;
    writeln (text : string ) : any ;
    xmlEncoding : string ;
    xmlStandalone : boolean ;
    xmlVersion : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NodeList extends NodeList_Instance {
  }
  class NodeList_Instance implements IArrayLike < any > {
    private noStructuralTyping_: any;
    item (index : number ) : Node ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NamedNodeMap extends NamedNodeMap_Instance {
  }
  class NamedNodeMap_Instance {
    private noStructuralTyping_: any;
    getNamedItem (name : string ) : Node ;
    item (index : number ) : Node ;
    length : number ;
    removeNamedItem (name : string ) : Node ;
    setNamedItem (arg : Node ) : Node ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CharacterData extends CharacterData_Instance {
  }
  class CharacterData_Instance extends Node_Instance {
    appendData (arg : string ) : void ;
    data : string ;
    deleteData (offset : number , count : number ) : void ;
    insertData (offset : number , arg : string ) : void ;
    length : number ;
    replaceData (offset : number , count : number , arg : string ) : void ;
    substringData (offset : number , count : number ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Attr extends Attr_Instance {
  }
  class Attr_Instance extends Node_Instance {
    isId : boolean ;
    name : string ;
    ownerElement : Element ;
    schemaTypeInfo : TypeInfo ;
    specified : boolean ;
    value : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Element extends Element_Instance {
    static ALLOW_KEYBOARD_INPUT : number ;
  }
  class Element_Instance extends Node_Instance {
    ALLOW_KEYBOARD_INPUT : number ;
    addBehavior (sUrl : string ) : number ;
    attachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    blur ( ) : void ;
    canHaveChildren : boolean ;
    childElementCount : number ;
    children : NodeList ;
    /**
     * A better interface to CSS classes than className.
     */
    classList : DOMTokenList ;
    classid : string ;
    click ( ) : void ;
    clientHeight : number ;
    clientLeft : number ;
    clientTop : number ;
    clientWidth : number ;
    cloneNode (deep : boolean ) : Element ;
    componentFromPoint (iCoordX : number , iCoordY : number ) : string ;
    contentEditable : boolean ;
    coordorigin : Object | string ;
    coordsize : Object | string ;
    createTextRange ( ) : TextRange ;
    currentStyle : any ;
    detachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    doScroll (opt_action ? : string ) : any ;
    fillcolor : string ;
    filled : boolean ;
    filters : HTMLFiltersCollection ;
    fireEvent : any ;
    /**
     * Firebug sets this property on elements it is inserting into the DOM.
     */
    firebugIgnore : boolean ;
    firstElementChild : Element ;
    focus ( ) : void ;
    getAttribute (name : string , opt_flags ? : number ) : string ;
    getAttributeNS (namespaceURI : string , localName : string ) : string ;
    getAttributeNode (name : string ) : Attr ;
    getAttributeNodeNS (namespaceURI : string , localName : string ) : Attr ;
    getBoundingClientRect ( ) : ClientRect ;
    getClientRects ( ) : ClientRectList ;
    getElementsByTagName (tagname : string ) : NodeList ;
    getElementsByTagNameNS (namespaceURI : string , localName : string ) : NodeList ;
    hasAttribute (name : string ) : boolean ;
    hasAttributeNS (namespaceURI : string , localName : string ) : boolean ;
    hideFocus : boolean ;
    /**
     * Note: According to the spec, id is actually defined on HTMLElement and
     * SVGElement, rather than Element. Deliberately ignore this so that saying
     * Element.id is allowed.
     */
    id : string ;
    innerHTML : string ;
    innerText : any ;
    isContentEditable : any ;
    lastElementChild : Element ;
    load : any ;
    /**
     * https://dom.spec.whatwg.org/#dom-element-matches
     * https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
     */
    matches (selectors : string ) : boolean ;
    matchesSelector (selectors : string , refNodes ? : Node | NodeList ) : boolean ;
    mozMatchesSelector (selectors : string ) : boolean ;
    mozRequestFullScreen ( ) : any ;
    mozRequestFullScreenWithKeys ( ) : any ;
    msExitFullscreen ( ) : void ;
    msMatchesSelector (selectors : string ) : boolean ;
    msReleasePointerCapture (pointerId : number ) : any ;
    msRequestFullscreen ( ) : void ;
    msSetPointerCapture (pointerId : number ) : any ;
    /**
     * Note: According to the spec, name is defined on specific types of
     * HTMLElements, rather than on Node, Element, or HTMLElement directly.
     * Ignore this.
     */
    name : any ;
    nextElementSibling : Element ;
    nodePrincipal : any ;
    oMatchesSelector (selectors : string ) : boolean ;
    onabort : (a : Event ) => any ;
    onbeforedeactivate : (a : Event ) => any ;
    onbeforeinput : (a : Event ) => any ;
    onbeforeunload : (a : Event ) => any ;
    onblur : (a : Event ) => any ;
    onchange : (a : Event ) => any ;
    onclick : (a : Event ) => any ;
    oncompositionend : (a : Event ) => any ;
    oncompositionstart : (a : Event ) => any ;
    oncompositionupdate : (a : Event ) => any ;
    oncontextmenu : (a : Event ) => any ;
    oncopy : (a : Event ) => any ;
    oncut : (a : Event ) => any ;
    ondblclick : (a : Event ) => any ;
    onerror : (a : Event ) => any ;
    onfocus : (a : Event ) => any ;
    onfocusin : (a : Event ) => any ;
    onfocusout : (a : Event ) => any ;
    /**
     * Specifies the JavaScript method to invoke when fingers are moved during a
     * gesture.
     */
    ongesturechange : (a : GestureEvent ) => any ;
    /**
     * Specifies the JavaScript method to invoke when a gesture ends (when there are
     * 0 or 1 fingers touching the surface).
     */
    ongestureend : (a : GestureEvent ) => any ;
    /**
     * Specifies the JavaScript method to invoke when a gesture is started by
     * two or more fingers touching the surface.
     */
    ongesturestart : (a : GestureEvent ) => any ;
    oninput : (a : Event ) => any ;
    onkeydown : (a : Event ) => any ;
    onkeypress : (a : Event ) => any ;
    onkeyup : (a : Event ) => any ;
    onload : (a : Event ) => any ;
    onmousedown : (a : Event ) => any ;
    onmouseenter : (a : Event ) => any ;
    onmouseleave : (a : Event ) => any ;
    onmousemove : (a : Event ) => any ;
    onmouseout : (a : Event ) => any ;
    onmouseover : (a : Event ) => any ;
    onmouseup : (a : Event ) => any ;
    onmousewheel : (a : Event ) => any ;
    onpaste : (a : Event ) => any ;
    onreset : (a : Event ) => any ;
    onresize : (a : Event ) => any ;
    onscroll : (a : Event ) => any ;
    onselect : (a : Event ) => any ;
    onselectstart : (a : Event ) => any ;
    onsubmit : (a ? : Event ) => any ;
    ontextinput : (a : Event ) => any ;
    /**
     * Specifies the JavaScript method to invoke when the system cancels tracking
     * for the touch.
     */
    ontouchcancel : (a : TouchEvent ) => any ;
    /**
     * Specifies the JavaScript method to invoke when a given event lifts from the
     * surface.
     */
    ontouchend : (a : TouchEvent ) => any ;
    /**
     * Specifies the JavaScript method to invoke when a finger for a given event
     * moves on the surface.
     */
    ontouchmove : (a : TouchEvent ) => any ;
    /**
     * Specifies the JavaScript method to invoke when a finger for a given event
     * touches the surface.
     */
    ontouchstart : (a : TouchEvent ) => any ;
    onunload : (a : Event ) => any ;
    onwheel : (a : Event ) => any ;
    outerHTML : string ;
    path : string ;
    previousElementSibling : Element ;
    querySelector (selectors : string ) : Element ;
    querySelectorAll (selectors : string ) : NodeList ;
    releaseCapture ( ) : any ;
    removeAttribute (name : string ) : void ;
    removeAttributeNS (namespaceURI : string , localName : string ) : void ;
    removeAttributeNode (oldAttr : Attr ) : Attr ;
    removeBehavior (iID : number ) : boolean ;
    requestFullscreen ( ) : any ;
    rotation : number | string ;
    runtimeStyle : any ;
    save (sStoreName : string ) : any ;
    schemaTypeInfo : TypeInfo ;
    scrollHeight : number ;
    scrollIntoView (opt_top ? : boolean | { behavior : string , block : string } ) : any ;
    scrollIntoViewIfNeeded (opt_center ? : boolean ) : any ;
    scrollLeft : number ;
    scrollTop : number ;
    scrollWidth : number ;
    setAttribute (name : string , value : string | number | boolean ) : void ;
    setAttributeNS (namespaceURI : string , qualifiedName : string , value : string | number | boolean ) : void ;
    setAttributeNode (newAttr : Attr ) : Attr ;
    setAttributeNodeNS (newAttr : Attr ) : Attr ;
    setCapture (opt_bContainerCapture ? : boolean ) : any ;
    setIdAttribute (name : string , isId : boolean ) : void ;
    setIdAttributeNS (namespaceURI : string , localName : string , isId : boolean ) : void ;
    setIdAttributeNode (idAttr : Attr , isId : boolean ) : void ;
    sourceIndex : any ;
    strokecolor : string ;
    stroked : boolean ;
    strokeweight : number | string ;
    style : CSSStyleDeclaration ;
    tagName : string ;
    unselectable : string ;
    webkitMatchesSelector (selectors : string ) : boolean ;
    /**
     * The current fullscreen element for the document is set to this element.
     * Valid only for Webkit browsers.
     * @param opt_allowKeyboardInput Whether keyboard input is desired. Should use ALLOW_KEYBOARD_INPUT constant.
     */
    webkitRequestFullScreen (opt_allowKeyboardInput ? : number ) : any ;
    /**
     * The current fullscreen element for the document is set to this element.
     * Valid only for Webkit browsers.
     * @param opt_allowKeyboardInput Whether keyboard input is desired. Should use ALLOW_KEYBOARD_INPUT constant.
     */
    webkitRequestFullscreen (opt_allowKeyboardInput ? : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Text extends Text_Instance {
  }
  class Text_Instance extends CharacterData_Instance {
    getDestinationInsertionPoints ( ) : NodeList ;
    replaceWholeText (newText : string ) : Text ;
    splitText (offset : number ) : Text ;
    wholeText : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Comment extends Comment_Instance {
  }
  class Comment_Instance extends CharacterData_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class CDATASection extends CDATASection_Instance {
  }
  class CDATASection_Instance extends Text_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class DocumentType extends DocumentType_Instance {
  }
  class DocumentType_Instance extends Node_Instance {
    entities : NamedNodeMap ;
    internalSubset : string ;
    name : string ;
    notations : NamedNodeMap ;
    publicId : string ;
    systemId : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Notation extends Notation_Instance {
  }
  class Notation_Instance extends Node_Instance {
    publicId : string ;
    systemId : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Entity extends Entity_Instance {
  }
  class Entity_Instance extends Node_Instance {
    inputEncoding : string ;
    notationName : string ;
    publicId : string ;
    systemId : string ;
    xmlEncoding : string ;
    xmlVersion : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class EntityReference extends EntityReference_Instance {
  }
  class EntityReference_Instance extends Node_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class ProcessingInstruction extends ProcessingInstruction_Instance {
  }
  class ProcessingInstruction_Instance extends Node_Instance {
    data : string ;
    target : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Window extends Window_Instance {
  }
  class Window_Instance implements EventTarget {
    private noStructuralTyping_: any;
    Array < VALUE1 > ( ...var_args : any [] ) : any [] ;
    Boolean (opt_value ? : any ) : boolean ;
    /**
     * TODO(nicksantos): This suppress tag probably isn't needed, and
     * should be removed.
     */
    CSS : CSSInterface ;
    Components : any ;
    Date (opt_yr_num ? : any , opt_mo_num ? : any , opt_day_num ? : any , opt_hr_num ? : any , opt_min_num ? : any , opt_sec_num ? : any , opt_ms_num ? : any ) : string ;
    Error (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : GlobalError ;
    EvalError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : EvalError ;
    Function ( ...var_args : any [] ) : any ;
    Infinity : number ;
    Intl : Object ;
    JSON : JSONType ;
    JavaArray : any ;
    JavaClass : any ;
    JavaMember : any ;
    JavaObject : any ;
    JavaPackage : any ;
    Math : Object ;
    NaN : number ;
    Number (opt_value ? : any ) : number ;
    Object (opt_value ? : any ) : Object ;
    PERSISTENT : number ;
    Packages : any ;
    RangeError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : RangeError ;
    ReferenceError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : ReferenceError ;
    RegExp (opt_pattern ? : any , opt_flags ? : any ) : RegExp ;
    RuntimeObject (a ? : any ) : any ;
    ScriptEngine ( ) : string ;
    ScriptEngineBuildVersion ( ) : number ;
    ScriptEngineMajorVersion ( ) : number ;
    ScriptEngineMinorVersion ( ) : number ;
    String (opt_str ? : any ) : string ;
    Symbol (a : string ) : any ;
    SyntaxError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : SyntaxError ;
    TEMPORARY : number ;
    TypeError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : TypeError ;
    URIError (opt_message ? : any , opt_file ? : any , opt_line ? : any ) : URIError ;
    Window : any ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    alert (message : any ) : any ;
    applicationCache : DOMApplicationCache ;
    /**
     * Not actually a global variable, but we need it in order for the current type
     * checker to typecheck the "arguments" variable in a function correctly.
     * TODO(tbreisacher): When the old type checker is gone, delete this and add
     * an 'arguments' variable of type Array<string> in the d8 externs.
     */
    arguments : Arguments ;
    /**
     * Decodes a string of data which has been encoded using base-64 encoding.
     */
    atob (a : string ) : string ;
    attachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    back ( ) : any ;
    blur ( ) : any ;
    btoa (a : string ) : string ;
    cancelAnimationFrame (handle : number ) : any ;
    cancelRequestAnimationFrame (handle : number ) : any ;
    captureEvents : any ;
    chrome : Object ;
    clearImmediate (a : number ) : any ;
    clearInterval (a : number ) : any ;
    clearTimeout (a : number ) : any ;
    clipboardData : ClipboardData ;
    close : ( ) => any ;
    closed : boolean ;
    confirm (a : any ) : boolean ;
    console : Console ;
    content : Window ;
    controllers : any ;
    createObjectURL (obj : Object ) : string ;
    createPopup : any ;
    crypto : any ;
    decodeURI (a : string ) : string ;
    decodeURIComponent (a : string ) : string ;
    /**
     * Gets/sets the status bar text for the given window.
     */
    defaultStatus : string ;
    detachEvent (a : string , b : ( ...a : any [] ) => any ) : any ;
    devicePixelRatio : number ;
    dialogArguments : any ;
    dialogHeight : any ;
    dialogLeft : any ;
    dialogTop : any ;
    dialogWidth : any ;
    directories : any ;
    dispatchEvent (evt : Event ) : boolean ;
    document : HTMLDocument ;
    dump : any ;
    encodeURI (a : string ) : string ;
    encodeURIComponent (a : string ) : string ;
    /**
     * Should only be used in browsers where encode/decodeURIComponent
     * are not present, as the latter handle fancy Unicode characters.
     */
    escape (a : string ) : string ;
    eval (a : string ) : any ;
    event : any ;
    execScript : any ;
    external : Object ;
    fetch (input : Request | string , opt_init ? : { body ? : Blob | FormData | string , cache ? : RequestCache , credentials ? : RequestCredentials , headers ? : Headers | string [] [] , method ? : string , mode ? : RequestMode } ) : Promise < Response > ;
    find : any ;
    focus ( ) : any ;
    forward ( ) : any ;
    frameElement : HTMLObjectElement | HTMLIFrameElement ;
    /**
     * Allows lookup of frames by index or by name.
     */
    frames : Object ;
    fullScreen : boolean ;
    getAttention ( ) : any ;
    getComputedStyle (a : Element , b ? : string ) : CSSStyleDeclaration ;
    getSelection ( ) : Selection ;
    globalStorage : any ;
    /**
     * Suppresses the compiler warning when multiple externs files declare the
     * google namespace.
     */
    google : any ;
    history : History ;
    home ( ) : any ;
    importScripts ( ...var_args : ( string ) [] ) : any ;
    indexedDB : IDBFactory ;
    innerHeight : number ;
    innerWidth : number ;
    isFinite (a : any ) : boolean ;
    isNaN (a : any ) : boolean ;
    java : any ;
    /**
     * Returns the number of frames (either frame or iframe elements) in the
     * window.
     */
    length : number ;
    /**
     * Window implements WindowLocalStorage
     */
    localStorage : Storage ;
    /**
     * Location has an exception in the DeclaredGlobalExternsOnWindow pass
     * so we have to manually include it:
     * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/DeclaredGlobalExternsOnWindow.java#L116
     */
    location : Location ;
    locationbar : any ;
    matchMedia (media_query_list : string ) : MediaQueryList ;
    maxConnectionsPer1_0Server : any ;
    maxConnectionsPerServer : any ;
    menubar : any ;
    methods : any ;
    moveBy (x : number , y : number ) : any ;
    moveTo (x : number , y : number ) : any ;
    mozCancelAnimationFrame (handle : number ) : any ;
    mozCancelRequestAnimationFrame (handle : number ) : any ;
    mozIndexedDB : IDBFactory ;
    mozRequestAnimationFrame (callback : (a : number ) => any , opt_element ? : Element ) : number ;
    moz_indexedDB : IDBFactory ;
    msCancelAnimationFrame (handle : number ) : any ;
    msCancelRequestAnimationFrame (handle : number ) : any ;
    msIndexedDB : IDBFactory ;
    msRequestAnimationFrame (callback : (a : number ) => any , opt_element ? : Element ) : number ;
    name : string ;
    navigate : any ;
    navigator : Navigator ;
    netscape : any ;
    oCancelAnimationFrame (handle : number ) : any ;
    oCancelRequestAnimationFrame (handle : number ) : any ;
    oRequestAnimationFrame (callback : (a : number ) => any , opt_element ? : Element ) : number ;
    offscreenBuffering : any ;
    onabort : (a : Event ) => any ;
    onbeforeunload : (a : Event ) => any ;
    onblur : (a : Event ) => any ;
    onchange : (a : Event ) => any ;
    onclick : (a : Event ) => any ;
    onclose : (a : Event ) => any ;
    oncontextmenu : (a : Event ) => any ;
    ondblclick : (a : Event ) => any ;
    ondragdrop : (a : Event ) => any ;
    onerror : (a : string , b : string , c : number ) => any ;
    onfocus : (a : Event ) => any ;
    onhashchange : (a : Event ) => any ;
    onkeydown : (a : Event ) => any ;
    onkeypress : (a : Event ) => any ;
    onkeyup : (a : Event ) => any ;
    onload : (a : Event ) => any ;
    onmousedown : (a : Event ) => any ;
    onmousemove : (a : Event ) => any ;
    onmouseout : (a : Event ) => any ;
    onmouseover : (a : Event ) => any ;
    onmouseup : (a : Event ) => any ;
    onmousewheel : (a : Event ) => any ;
    /**
     * Specifies the JavaScript method to invoke when the browser device's
     * orientation changes, i.e.the device is rotated.
     */
    onorientationchange : (a : Event ) => any ;
    onpaint : (a : Event ) => any ;
    onpopstate : (a : Event ) => any ;
    onreset : (a : Event ) => any ;
    onresize : (a : Event ) => any ;
    onscroll : (a : Event ) => any ;
    onselect : (a : Event ) => any ;
    onsubmit : (a ? : Event ) => any ;
    onunload : (a : Event ) => any ;
    onwheel : (a : Event ) => any ;
    open : (opt_url ? : any , opt_windowName ? : string , opt_windowFeatures ? : string , opt_replace ? : boolean ) => Window ;
    openDatabase (name : string , version : string , description : string , size : number , opt_callback ? : DatabaseCallback | ( (a : Database ) => any ) ) : Database ;
    openDialog : any ;
    opener : Window ;
    opera : any ;
    /**
     * Returns the orientation of the browser's device, one of [-90, 0, 90, 180].
     */
    orientation : number ;
    outerHeight : number ;
    outerWidth : number ;
    pageXOffset : number ;
    pageYOffset : number ;
    parent : Window ;
    parseFloat (a : any ) : number ;
    /**
     * Parse an integer. Use of {@code parseInt} without {@code base} is strictly
     * banned in Google. If you really want to parse octal or hex based on the
     * leader, then pass {@code undefined} as the base.
     */
    parseInt (a : any , b : number ) : number ;
    performance : Performance ;
    personalbar : any ;
    pkcs11 : any ;
    /**
     * This is a superposition of the Window and Worker postMessage methods.
     */
    postMessage (a : any , b ? : string | Transferable [] , c ? : string | any [] ) : void ;
    print ( ) : any ;
    prompt (a : string , b ? : string ) : string ;
    releaseEvents : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    requestAnimationFrame (callback : (a : number ) => any , opt_element ? : Element ) : number ;
    requestFileSystem (type : number , size : number , successCallback : (a : FileSystem ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    resizeBy (width : number , height : number ) : any ;
    resizeTo (width : number , height : number ) : any ;
    resolveLocalFileSystemURI (uri : string , successCallback : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    returnValue : any ;
    revokeObjectURL (url : string ) : any ;
    screen : Screen ;
    screenLeft : any ;
    screenTop : any ;
    screenX : number ;
    screenY : number ;
    scroll (x : number , y : number ) : any ;
    scrollBy (x : number , y : number ) : any ;
    scrollByLines : any ;
    scrollByPages : any ;
    scrollMaxX : number ;
    scrollMaxY : number ;
    scrollTo (x : number , y : number ) : any ;
    scrollX : number ;
    scrollY : number ;
    scrollbars : any ;
    self : Window ;
    /**
     * Window implements WindowSessionStorage
     */
    sessionStorage : Storage ;
    setActive : any ;
    setImmediate (a : ( ) => any ) : number ;
    setInterval (a : ( ( ...a : any [] ) => any ) | string , b ? : number ) : number ;
    setTimeout (a : ( ( ...a : any [] ) => any ) | string , b ? : number ,  ...c : any [] ) : number ;
    showHelp : any ;
    showModalDialog (a : string , b ? : any , c ? : string ) : any ;
    showModelessDialog : any ;
    sidebar : any ;
    sizeToContent : any ;
    status : string ;
    statusbar : any ;
    stop ( ) : any ;
    sun : any ;
    toolbar : any ;
    top : Window ;
    undefined : void ;
    /**
     * Should only be used in browsers where encode/decodeURIComponent
     * are not present, as the latter handle fancy Unicode characters.
     */
    unescape (a : string ) : string ;
    updateCommands : any ;
    webCrypto : Object ;
    webkitCancelAnimationFrame (handle : number ) : any ;
    webkitCancelRequestAnimationFrame (handle : number ) : any ;
    webkitIndexedDB : IDBFactory ;
    /**
     * WebKit browsers expose the NotificationCenter API through
     * window.webkitNotifications.
     */
    webkitNotifications : NotificationCenter ;
    webkitRequestAnimationFrame (callback : (a : number ) => any , opt_element ? : Element ) : number ;
    /**
     * This has replaced requestFileSystem in Chrome since WebKit revision 84224.
     */
    webkitRequestFileSystem (type : number , size : number , successCallback : (a : FileSystem ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    /**
     * This has replaced resolveLocalFileSystemURI in Chrome since WebKit revision
     * 84224.
     */
    webkitResolveLocalFileSystemURI (uri : string , successCallback : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    webkitStorageInfo : StorageInfo ;
    window : Window ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLCollection extends HTMLCollection_Instance {
  }
  class HTMLCollection_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : Node ;
    length : number ;
    namedItem (name : string ) : Node ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLOptionsCollection extends HTMLOptionsCollection_Instance {
  }
  class HTMLOptionsCollection_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : Node ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDocument extends HTMLDocument_Instance {
  }
  class HTMLDocument_Instance extends Document_Instance {
    URL : string ;
    anchors : HTMLCollection ;
    applets : HTMLCollection ;
    body : HTMLBodyElement ;
    close : ( ) => void ;
    cookie : string ;
    createNodeIterator (root : Node , whatToShow ? : number , filter ? : NodeFilter , entityReferenceExpansion ? : boolean ) : NodeIterator ;
    createTreeWalker : (root : Node , whatToShow ? : number , filter ? : NodeFilter , entityReferenceExpansion ? : boolean ) => TreeWalker ;
    domain : string ;
    forms : HTMLCollection ;
    getElementsByName (elementName : string ) : NodeList ;
    images : HTMLCollection ;
    links : HTMLCollection ;
    open : ( ) => void ;
    readyState : string ;
    referrer : string ;
    title : string ;
    write (text : string ) : void ;
    writeln (text : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface NodeFilter {
    acceptNode (n : Node ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface NodeIterator {
    /**
     * Detach and invalidate the NodeIterator.
     */
    detach ( ) : any ;
    nextNode ( ) : Node ;
    previousNode ( ) : Node ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface TreeWalker {
    currentNode : Node ;
    expandEntityReference : boolean ;
    filter : NodeFilter ;
    firstChild ( ) : Node ;
    lastChild ( ) : Node ;
    nextNode ( ) : Node ;
    nextSibling ( ) : Node ;
    parentNode ( ) : Node ;
    previousNode ( ) : Node ;
    previousSibling ( ) : Node ;
    root : Node ;
    whatToShow : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLElement extends HTMLElement_Instance {
  }
  class HTMLElement_Instance extends Element_Instance {
    attachedCallback ( ) : any ;
    className : string ;
    contextMenu : Element ;
    createShadowRoot ( ) : ShadowRoot ;
    createdCallback ( ) : any ;
    /**
     * Dataset collection.
     * This is really a DOMStringMap but it behaves close enough to an object to
     * pass as an object.
     */
    dataset : Object ;
    detachedCallback ( ) : any ;
    dir : string ;
    draggable : boolean ;
    /**
     * This is actually a DOMSettableTokenList property. However since that
     * interface isn't currently defined and no known browsers implement this
     * feature, just define the property for now.
     */
    dropzone : Object ;
    getDestinationInsertionPoints ( ) : NodeList ;
    getElementsByClassName (classNames : string ) : NodeList ;
    hidden : boolean ;
    id : string ;
    lang : string ;
    offsetHeight : number ;
    offsetLeft : number ;
    offsetParent : Element ;
    offsetTop : number ;
    offsetWidth : number ;
    shadowRoot : ShadowRoot ;
    spellcheck : boolean ;
    style : CSSStyleDeclaration ;
    title : string ;
    webkitCreateShadowRoot ( ) : ShadowRoot ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLHtmlElement extends HTMLHtmlElement_Instance {
  }
  class HTMLHtmlElement_Instance extends HTMLElement_Instance {
    version : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLHeadElement extends HTMLHeadElement_Instance {
  }
  class HTMLHeadElement_Instance extends HTMLElement_Instance {
    profile : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLLinkElement extends HTMLLinkElement_Instance {
  }
  class HTMLLinkElement_Instance extends HTMLElement_Instance implements LinkStyle {
    charset : string ;
    disabled : boolean ;
    href : string ;
    hreflang : string ;
    import : Document ;
    media : string ;
    rel : string ;
    rev : string ;
    sheet : StyleSheet ;
    target : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTitleElement extends HTMLTitleElement_Instance {
  }
  class HTMLTitleElement_Instance extends HTMLElement_Instance {
    text : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLMetaElement extends HTMLMetaElement_Instance {
  }
  class HTMLMetaElement_Instance extends HTMLElement_Instance {
    content : string ;
    httpEquiv : string ;
    name : string ;
    scheme : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLBaseElement extends HTMLBaseElement_Instance {
  }
  class HTMLBaseElement_Instance extends HTMLElement_Instance {
    href : string ;
    target : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLIsIndexElement extends HTMLIsIndexElement_Instance {
  }
  class HTMLIsIndexElement_Instance extends HTMLElement_Instance {
    form : HTMLFormElement ;
    prompt : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLStyleElement extends HTMLStyleElement_Instance {
  }
  class HTMLStyleElement_Instance extends HTMLElement_Instance implements LinkStyle {
    disabled : boolean ;
    media : string ;
    sheet : StyleSheet ;
    styleSheet : StyleSheet ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLBodyElement extends HTMLBodyElement_Instance {
  }
  class HTMLBodyElement_Instance extends HTMLElement_Instance {
    aLink : string ;
    background : string ;
    bgColor : string ;
    createControlRange : any ;
    link : string ;
    text : string ;
    vLink : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFormElement extends HTMLFormElement_Instance {
  }
  class HTMLFormElement_Instance extends HTMLElement_Instance {
    acceptCharset : string ;
    action : string ;
    checkValidity ( ) : boolean ;
    elements : HTMLCollection ;
    enctype : string ;
    length : number ;
    method : string ;
    name : string ;
    noValidate : boolean ;
    reset ( ) : void ;
    submit ( ) : void ;
    target : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLSelectElement extends HTMLSelectElement_Instance {
  }
  class HTMLSelectElement_Instance extends HTMLElement_Instance {
    add (element : HTMLElement , before : HTMLElement ) : void ;
    autofocus : boolean ;
    blur ( ) : void ;
    checkValidity ( ) : boolean ;
    disabled : boolean ;
    focus ( ) : void ;
    form : HTMLFormElement ;
    labels : NodeList ;
    length : number ;
    multiple : boolean ;
    name : string ;
    options : HTMLOptionsCollection ;
    remove (index : number ) : void ;
    selectedIndex : number ;
    selectedOptions : HTMLCollection ;
    setCustomValidity (message : string ) : any ;
    size : number ;
    tabIndex : number ;
    type : string ;
    validationMessage : string ;
    validity : ValidityState ;
    value : string ;
    willValidate : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLOptGroupElement extends HTMLOptGroupElement_Instance {
  }
  class HTMLOptGroupElement_Instance extends HTMLElement_Instance {
    disabled : boolean ;
    label : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLOptionElement extends HTMLOptionElement_Instance {
  }
  class HTMLOptionElement_Instance extends HTMLElement_Instance {
    defaultSelected : boolean ;
    disabled : boolean ;
    form : HTMLFormElement ;
    index : number ;
    label : string ;
    selected : boolean ;
    text : string ;
    value : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLInputElement extends HTMLInputElement_Instance {
  }
  class HTMLInputElement_Instance extends HTMLElement_Instance {
    accept : string ;
    accessKey : string ;
    align : string ;
    alt : string ;
    autocapitalize : boolean ;
    autocomplete : string ;
    autocorrect : boolean ;
    autofocus : boolean ;
    blur ( ) : void ;
    checkValidity ( ) : boolean ;
    checked : boolean ;
    click ( ) : void ;
    defaultChecked : boolean ;
    defaultValue : string ;
    dirname : string ;
    disabled : boolean ;
    files : FileList ;
    focus ( ) : void ;
    form : HTMLFormElement ;
    formAction : string ;
    formEnctype : string ;
    formMethod : string ;
    formNoValidate : boolean ;
    formTarget : string ;
    labels : NodeList ;
    list : string ;
    max : string ;
    maxLength : number ;
    min : string ;
    multiple : boolean ;
    name : string ;
    pattern : string ;
    placeholder : string ;
    readOnly : boolean ;
    required : boolean ;
    select ( ) : void ;
    selectionEnd : number ;
    selectionStart : number ;
    setCustomValidity (message : string ) : any ;
    setSelectionRange (selectionStart : number , selectionEnd : number ) : any ;
    size : number ;
    src : string ;
    step : string ;
    /**
     * Changes the form control's value by the value given in the step attribute
     * multiplied by opt_n.
     * @param opt_n step multiplier.  Defaults to 1.
     */
    stepDown (opt_n ? : number ) : any ;
    /**
     * Changes the form control's value by the value given in the step attribute
     * multiplied by opt_n.
     * @param opt_n step multiplier.  Defaults to 1.
     */
    stepUp (opt_n ? : number ) : any ;
    tabIndex : number ;
    type : string ;
    useMap : string ;
    validationMessage : string ;
    validity : ValidityState ;
    value : string ;
    valueAsDate : Date ;
    valueAsNumber : number ;
    willValidate : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTextAreaElement extends HTMLTextAreaElement_Instance {
  }
  class HTMLTextAreaElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    autocapitalize : boolean ;
    autocorrect : boolean ;
    autofocus : boolean ;
    blur ( ) : void ;
    checkValidity ( ) : boolean ;
    cols : number ;
    defaultValue : string ;
    disabled : boolean ;
    focus ( ) : void ;
    form : HTMLFormElement ;
    labels : NodeList ;
    name : string ;
    readOnly : boolean ;
    rows : number ;
    select ( ) : void ;
    selectionEnd : number ;
    selectionStart : number ;
    setCustomValidity (message : string ) : any ;
    setSelectionRange (selectionStart : number , selectionEnd : number ) : any ;
    tabIndex : number ;
    type : string ;
    validationMessage : string ;
    validity : ValidityState ;
    value : string ;
    willValidate : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLButtonElement extends HTMLButtonElement_Instance {
  }
  class HTMLButtonElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    autofocus : boolean ;
    checkValidity ( ) : boolean ;
    disabled : boolean ;
    form : HTMLFormElement ;
    formAction : string ;
    formEnctype : string ;
    formMethod : string ;
    formTarget : string ;
    labels : NodeList ;
    name : string ;
    setCustomValidity (message : string ) : any ;
    tabIndex : number ;
    type : string ;
    validationMessage : string ;
    validity : ValidityState ;
    value : string ;
    willValidate : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLLabelElement extends HTMLLabelElement_Instance {
  }
  class HTMLLabelElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    control : Element ;
    form : HTMLFormElement ;
    htmlFor : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFieldSetElement extends HTMLFieldSetElement_Instance {
  }
  class HTMLFieldSetElement_Instance extends HTMLElement_Instance {
    form : HTMLFormElement ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLLegendElement extends HTMLLegendElement_Instance {
  }
  class HTMLLegendElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    align : string ;
    form : HTMLFormElement ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLUListElement extends HTMLUListElement_Instance {
  }
  class HTMLUListElement_Instance extends HTMLElement_Instance {
    compact : boolean ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLOListElement extends HTMLOListElement_Instance {
  }
  class HTMLOListElement_Instance extends HTMLElement_Instance {
    compact : boolean ;
    start : number ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDListElement extends HTMLDListElement_Instance {
  }
  class HTMLDListElement_Instance extends HTMLElement_Instance {
    compact : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDirectoryElement extends HTMLDirectoryElement_Instance {
  }
  class HTMLDirectoryElement_Instance extends HTMLElement_Instance {
    compact : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLMenuElement extends HTMLMenuElement_Instance {
  }
  class HTMLMenuElement_Instance extends HTMLElement_Instance {
    compact : boolean ;
    label : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLLIElement extends HTMLLIElement_Instance {
  }
  class HTMLLIElement_Instance extends HTMLElement_Instance {
    type : string ;
    value : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDivElement extends HTMLDivElement_Instance {
  }
  class HTMLDivElement_Instance extends HTMLElement_Instance {
    align : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLParagraphElement extends HTMLParagraphElement_Instance {
  }
  class HTMLParagraphElement_Instance extends HTMLElement_Instance {
    align : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLHeadingElement extends HTMLHeadingElement_Instance {
  }
  class HTMLHeadingElement_Instance extends HTMLElement_Instance {
    align : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLQuoteElement extends HTMLQuoteElement_Instance {
  }
  class HTMLQuoteElement_Instance extends HTMLElement_Instance {
    cite : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLPreElement extends HTMLPreElement_Instance {
  }
  class HTMLPreElement_Instance extends HTMLElement_Instance {
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLBRElement extends HTMLBRElement_Instance {
  }
  class HTMLBRElement_Instance extends HTMLElement_Instance {
    clear : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLBaseFontElement extends HTMLBaseFontElement_Instance {
  }
  class HTMLBaseFontElement_Instance extends HTMLElement_Instance {
    color : string ;
    face : string ;
    size : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFontElement extends HTMLFontElement_Instance {
  }
  class HTMLFontElement_Instance extends HTMLElement_Instance {
    color : string ;
    face : string ;
    size : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLHRElement extends HTMLHRElement_Instance {
  }
  class HTMLHRElement_Instance extends HTMLElement_Instance {
    align : string ;
    noShade : boolean ;
    size : string ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLModElement extends HTMLModElement_Instance {
  }
  class HTMLModElement_Instance extends HTMLElement_Instance {
    cite : string ;
    dateTime : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLAnchorElement extends HTMLAnchorElement_Instance {
  }
  class HTMLAnchorElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    blur ( ) : void ;
    charset : string ;
    coords : string ;
    download : string ;
    focus ( ) : void ;
    hash : string ;
    host : string ;
    hostname : string ;
    href : string ;
    hreflang : string ;
    name : string ;
    pathname : string ;
    /**
     * The 'ping' attribute is known to be supported in recent versions (as of
     * mid-2014) of Chrome, Safari, and Firefox, and is not supported in any
     * current version of Internet Explorer.
     */
    ping : string ;
    port : string ;
    protocol : string ;
    rel : string ;
    rev : string ;
    search : string ;
    shape : string ;
    tabIndex : number ;
    target : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLImageElement extends HTMLImageElement_Instance {
  }
  class HTMLImageElement_Instance extends HTMLElement_Instance {
    align : string ;
    alt : string ;
    border : string ;
    complete : boolean ;
    crossOrigin : string ;
    height : number ;
    hspace : number ;
    isMap : boolean ;
    longDesc : string ;
    lowSrc : string ;
    name : string ;
    naturalHeight : number ;
    naturalWidth : number ;
    onerror : (a : Event ) => any ;
    onload : (a : Event ) => any ;
    readyState : string ;
    sizes : string ;
    src : string ;
    srcset : string ;
    useMap : string ;
    vspace : number ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLObjectElement extends HTMLObjectElement_Instance {
  }
  class HTMLObjectElement_Instance extends HTMLElement_Instance {
    /**
     * Call a Flash function exported by ExternalInterface.
     * @param xmlString The XML string passed to Flash. The outer element should be {@code <invoke>}. A sample invocation string: {@code <invoke name="function_name" returntype="javascript"> <string>test</string></invoke>}
     */
    CallFunction (xmlString : string ) : string ;
    /**
     * Returns the value of the Flash variable specified by varName or null if the
     * variable does not exist.
     * @param varName The variable name.
     */
    GetVariable (varName : string ) : string ;
    /**
     * Activates the frame number specified by {@code frameNumber} in the current
     * movie.
     * @param frameNumber A non-negative integer frame number.
     */
    GotoFrame (frameNumber : number ) : any ;
    IsPlaying ( ) : boolean ;
    /**
     * Loads the movie identified by {@code url} to the layer specified by {@code
     * layerNumber}.
     * @param layerNumber The layer number.
     * @param url The movie URL.
     */
    LoadMovie (layerNumber : number , url : string ) : any ;
    /**
     * Pans a zoomed-in movie to the coordinates specified by x and y. Use mode to
     * specify whether the values for x and y are pixels or a percent of the window.
     * When mode is 0, the coordinates are pixels; when mode is 1, the coordinates
     * are percent of the window.
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param mode The mode.
     */
    Pan (x : number , y : number , mode : number ) : any ;
    PercentLoaded ( ) : number ;
    /**
     * Starts playing the movie.
     */
    Play ( ) : any ;
    /**
     * Goes to the first frame.
     */
    Rewind ( ) : any ;
    /**
     * Sets the value of the flash variable.
     * @param variableName The variable name.
     * @param value The value.
     */
    SetVariable (variableName : string , value : string ) : any ;
    /**
     * Zooms in on a rectangular area of the movie. The units of the coordinates
     * are in twips (1440 units per inch).
     * @param left The left coordinate.
     * @param top The top coordinate.
     * @param right The right coordinate.
     * @param bottom The bottom coordinate.
     */
    SetZoomRect (left : number , top : number , right : number , bottom : number ) : any ;
    /**
     * Stops playing the movie.
     */
    StopPlay ( ) : any ;
    /**
     * Executes the action in the timeline specified by {@code target} in the
     * specified frame.
     * @param target The timeline.
     * @param frameNumber The frame number.
     */
    TCallFrame (target : string , frameNumber : number ) : any ;
    /**
     * Executes the action in the timeline specified by {@code target} in the
     * specified frame.
     * @param target The timeline.
     * @param label The frame label.
     */
    TCallLabel (target : string , label : string ) : any ;
    /**
     * Returns the number of the current frame for the specified timeline.
     * @param target The timeline.
     */
    TCurentFrame (target : string ) : number ;
    /**
     * Returns the label of the current frame for the specified timeline.
     * @param target The timeline.
     */
    TCurrentLabel (target : string ) : string ;
    /**
     * Returns a string indicating the value of the property in the
     * specified timeline.
     * @param target The timeline.
     * @param property The integer corresponding to the desired property.
     */
    TGetProperty (target : string , property : number ) : string ;
    /**
     * Returns a number indicating the value of the property in the specified
     * timeline.
     * @param target The timeline.
     * @param property The integer corresponding to the desired property.
     */
    TGetPropertyAsNumber (target : string , property : number ) : number ;
    /**
     * Goes to the specified frame number in the specified timeline.
     * @param target The timeline.
     * @param frameNumber The frame number.
     */
    TGotoFrame (target : string , frameNumber : number ) : any ;
    /**
     * Goes to the specified frame label in the specified timeline.
     * @param target The timeline.
     * @param label The framelabel.
     */
    TGotoLabel (target : string , label : string ) : any ;
    /**
     * Plays the specified timeline.
     * @param target The timeline.
     */
    TPlay (target : number ) : any ;
    /**
     * Sets the value of the property in the specified timeline.
     * @param target The timeline.
     * @param property The integer corresponding to the desired property.
     * @param value The value.
     */
    TSetProperty (target : number , property : number , value : string | number ) : any ;
    /**
     * Stops the specified timeline.
     * @param target The timeline.
     */
    TStopPlay (target : number ) : any ;
    TotalFrames ( ) : number ;
    /**
     * Zooms the view by a relative scale factor.
     * @param percent The percentage scale factor, should be an integer.
     */
    Zoom (percent : number ) : any ;
    align : string ;
    archive : string ;
    border : string ;
    code : string ;
    codeBase : string ;
    codeType : string ;
    contentDocument : Document ;
    data : string ;
    declare : boolean ;
    form : HTMLFormElement ;
    height : string ;
    hspace : number ;
    name : string ;
    readyState : string ;
    standby : string ;
    tabIndex : number ;
    type : string ;
    useMap : string ;
    vspace : number ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLParamElement extends HTMLParamElement_Instance {
  }
  class HTMLParamElement_Instance extends HTMLElement_Instance {
    name : string ;
    type : string ;
    value : string ;
    valueType : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLAppletElement extends HTMLAppletElement_Instance {
  }
  class HTMLAppletElement_Instance extends HTMLElement_Instance {
    align : string ;
    alt : string ;
    archive : string ;
    code : string ;
    codeBase : string ;
    height : string ;
    hspace : number ;
    name : string ;
    object : string ;
    vspace : number ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLMapElement extends HTMLMapElement_Instance {
  }
  class HTMLMapElement_Instance extends HTMLElement_Instance {
    areas : HTMLCollection ;
    name : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLAreaElement extends HTMLAreaElement_Instance {
  }
  class HTMLAreaElement_Instance extends HTMLElement_Instance {
    accessKey : string ;
    alt : string ;
    coords : string ;
    download : string ;
    href : string ;
    noHref : boolean ;
    ping : string ;
    shape : string ;
    tabIndex : number ;
    target : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLScriptElement extends HTMLScriptElement_Instance {
  }
  class HTMLScriptElement_Instance extends HTMLElement_Instance {
    charset : string ;
    defer : boolean ;
    event : string ;
    htmlFor : string ;
    readyState : string ;
    src : string ;
    text : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableElement extends HTMLTableElement_Instance {
  }
  class HTMLTableElement_Instance extends HTMLElement_Instance {
    align : string ;
    bgColor : string ;
    border : string ;
    caption : HTMLTableCaptionElement ;
    cellPadding : string ;
    cellSpacing : string ;
    createCaption ( ) : HTMLElement ;
    createTFoot ( ) : HTMLElement ;
    createTHead ( ) : HTMLElement ;
    deleteCaption ( ) : void ;
    deleteRow (index : number ) : HTMLElement ;
    deleteTFoot ( ) : void ;
    deleteTHead ( ) : void ;
    frame : string ;
    insertRow (index : number ) : HTMLElement ;
    rows : HTMLCollection ;
    rules : string ;
    summary : string ;
    tBodies : HTMLCollection ;
    tFoot : HTMLTableSectionElement ;
    tHead : HTMLTableSectionElement ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableCaptionElement extends HTMLTableCaptionElement_Instance {
  }
  class HTMLTableCaptionElement_Instance extends HTMLElement_Instance {
    align : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableColElement extends HTMLTableColElement_Instance {
  }
  class HTMLTableColElement_Instance extends HTMLElement_Instance {
    align : string ;
    ch : string ;
    chOff : string ;
    span : number ;
    vAlign : string ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableSectionElement extends HTMLTableSectionElement_Instance {
  }
  class HTMLTableSectionElement_Instance extends HTMLElement_Instance {
    align : string ;
    ch : string ;
    chOff : string ;
    deleteRow (index : number ) : HTMLElement ;
    insertRow (index : number ) : HTMLElement ;
    rows : HTMLCollection ;
    vAlign : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableRowElement extends HTMLTableRowElement_Instance {
  }
  class HTMLTableRowElement_Instance extends HTMLElement_Instance {
    align : string ;
    bgColor : string ;
    cells : HTMLCollection ;
    ch : string ;
    chOff : string ;
    deleteCell (index : number ) : void ;
    insertCell (index : number ) : HTMLElement ;
    rowIndex : number ;
    sectionRowIndex : number ;
    vAlign : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTableCellElement extends HTMLTableCellElement_Instance {
  }
  class HTMLTableCellElement_Instance extends HTMLElement_Instance {
    abbr : string ;
    align : string ;
    axis : string ;
    bgColor : string ;
    cellIndex : number ;
    ch : string ;
    chOff : string ;
    colSpan : number ;
    headers : string ;
    height : string ;
    noWrap : boolean ;
    rowSpan : number ;
    scope : string ;
    vAlign : string ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFrameSetElement extends HTMLFrameSetElement_Instance {
  }
  class HTMLFrameSetElement_Instance extends HTMLElement_Instance {
    cols : string ;
    rows : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFrameElement extends HTMLFrameElement_Instance {
  }
  class HTMLFrameElement_Instance extends HTMLElement_Instance {
    allowTransparency : boolean ;
    contentDocument : Document ;
    contentWindow : Window ;
    frameBorder : string ;
    longDesc : string ;
    marginHeight : string ;
    marginWidth : string ;
    name : string ;
    noResize : boolean ;
    scrolling : string ;
    src : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLIFrameElement extends HTMLIFrameElement_Instance {
  }
  class HTMLIFrameElement_Instance extends HTMLElement_Instance {
    align : string ;
    allowTransparency : boolean ;
    contentDocument : Document ;
    contentWindow : Window ;
    frameBorder : string ;
    height : string ;
    longDesc : string ;
    marginHeight : string ;
    marginWidth : string ;
    name : string ;
    readyState : string ;
    sandbox : string ;
    scrolling : string ;
    src : string ;
    srcdoc : string ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMStringList extends DOMStringList_Instance {
  }
  class DOMStringList_Instance {
    private noStructuralTyping_: any;
    contains (str : string ) : boolean ;
    item (index : number ) : string ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NameList extends NameList_Instance {
  }
  class NameList_Instance {
    private noStructuralTyping_: any;
    contains (str : string ) : boolean ;
    containsNS (namespaceURI : string , name : string ) : boolean ;
    getName (index : number ) : string ;
    getNamespaceURI (index : number ) : string ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMImplementationList extends DOMImplementationList_Instance {
  }
  class DOMImplementationList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : DOMImplementation ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMImplementationSource extends DOMImplementationSource_Instance {
  }
  class DOMImplementationSource_Instance {
    private noStructuralTyping_: any;
    getDOMImplementation (features : string ) : DOMImplementation ;
    getDOMImplementationList (features : string ) : DOMImplementationList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TypeInfo extends TypeInfo_Instance {
  }
  class TypeInfo_Instance {
    private noStructuralTyping_: any;
    DERIVATION_EXTENSION : number ;
    DERIVATION_LIST : number ;
    DERIVATION_RESTRICTION : number ;
    DERIVATION_UNION : number ;
    isDerivedFrom (typeNamespaceArg : string , typeNameArg : string , derivationMethod : number ) : boolean ;
    typeName : string ;
    typeNamespace : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class UserDataHandler extends UserDataHandler_Instance {
  }
  class UserDataHandler_Instance {
    private noStructuralTyping_: any;
    NODE_ADOPTED : number ;
    NODE_CLONED : number ;
    NODE_DELETED : number ;
    NODE_IMPORTED : number ;
    NODE_RENAMED : number ;
    handle (operation : number , key : string , opt_data ? : any , opt_src ? : Node , opt_dst ? : Node ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMError extends DOMError_Instance {
    static SEVERITY_ERROR : number ;
    static SEVERITY_FATAL_ERROR : number ;
    static SEVERITY_WARNING : number ;
  }
  class DOMError_Instance {
    private noStructuralTyping_: any;
    location : DOMLocator ;
    message : string ;
    name : string ;
    relatedData : Object ;
    relatedException : Object ;
    severity : number ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMErrorHandler extends DOMErrorHandler_Instance {
  }
  class DOMErrorHandler_Instance {
    private noStructuralTyping_: any;
    handleError (error : DOMError ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMLocator extends DOMLocator_Instance {
  }
  class DOMLocator_Instance {
    private noStructuralTyping_: any;
    byteOffset : number ;
    columnNumber : number ;
    lineNumber : number ;
    relatedNode : Node ;
    uri : string ;
    utf16Offset : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMConfiguration extends DOMConfiguration_Instance {
  }
  class DOMConfiguration_Instance {
    private noStructuralTyping_: any;
    canSetParameter (name : string ) : boolean ;
    getParameter (name : string ) : any ;
    parameterNames : DOMStringList ;
    setParameter (name : string , value : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Mozilla only???
   */
  class HTMLSpanElement extends HTMLSpanElement_Instance {
  }
  class HTMLSpanElement_Instance extends HTMLElement_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class Selection extends Selection_Instance {
  }
  class Selection_Instance {
    private noStructuralTyping_: any;
    addRange (range : Range ) : void ;
    anchorNode : Node ;
    anchorOffset : number ;
    baseNode : Node ;
    baseOffset : number ;
    clear ( ) : void ;
    collapse (node : Node , index : number ) : void ;
    collapseToEnd ( ) : void ;
    collapseToStart ( ) : void ;
    containsNode (node : Node , partlyContained : boolean ) : boolean ;
    createRange ( ) : TextRange | ControlRange ;
    createRangeCollection ( ) : ( TextRange ) [] ;
    deleteFromDocument ( ) : any ;
    empty ( ) : void ;
    extend (parentNode : Node , offset : number ) : any ;
    extentNode : Node ;
    extentOffset : number ;
    focusNode : Node ;
    focusOffset : number ;
    getRangeAt (index : number ) : Range ;
    isCollapsed : boolean ;
    modify (alter : string , direction : string , granularity : string ) : void ;
    rangeCount : number ;
    removeAllRanges ( ) : any ;
    removeRange (range : Range ) : any ;
    selectAllChildren (a : Node ) : any ;
    selectionLanguageChange : any ;
    setBaseAndExtent (baseNode : Node , baseOffset : number , extentNode : Node , extentOffset : number ) : void ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Navigator extends Navigator_Instance {
  }
  class Navigator_Instance {
    private noStructuralTyping_: any;
    appCodeName : string ;
    appName : string ;
    appVersion : string ;
    browserLanguage : string ;
    buildID : string ;
    cookieEnabled : boolean ;
    geolocation : Geolocation ;
    getBattery ( ) : Promise < BatteryManager > ;
    javaEnabled ( ) : boolean ;
    language : string ;
    languages : string [] ;
    mimeTypes : MimeTypeArray ;
    msMaxTouchPoints : number ;
    msPointerEnabled : boolean ;
    onLine : boolean ;
    oscpu : string ;
    platform : string ;
    plugins : PluginArray ;
    product : string ;
    productSub : string ;
    securityPolicy : string ;
    sendBeacon (url : string , opt_data ? : ArrayBufferView | Blob | string | FormData ) : boolean ;
    serviceWorker : ServiceWorkerContainer ;
    userAgent : string ;
    vendor : string ;
    vendorSub : string ;
    webkitGetUserMedia (constraints : Object , successCallback : (a : MediaStream ) => any , errorCallback ? : (a : NavigatorUserMediaError ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PluginArray extends PluginArray_Instance {
  }
  class PluginArray_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : Plugin ;
    length : number ;
    namedItem (name : string ) : Plugin ;
    refresh (reloadDocuments ? : boolean ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MimeTypeArray extends MimeTypeArray_Instance {
  }
  class MimeTypeArray_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : MimeType ;
    length : number ;
    namedItem (name : string ) : MimeType ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MimeType extends MimeType_Instance {
  }
  class MimeType_Instance {
    private noStructuralTyping_: any;
    description : string ;
    enabledPlugin : Plugin ;
    suffixes : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Plugin extends Plugin_Instance {
  }
  class Plugin_Instance {
    private noStructuralTyping_: any;
    description : string ;
    filename : string ;
    length : number ;
    name : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class BoxObject extends BoxObject_Instance {
  }
  class BoxObject_Instance {
    private noStructuralTyping_: any;
    element : Element ;
    screenX : number ;
    screenY : number ;
    width : number ;
    x : number ;
    y : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XMLDOMDocument extends XMLDOMDocument_Instance {
  }
  class XMLDOMDocument_Instance extends Document_Instance {
    abort ( ) : any ;
    async : boolean ;
    createNode (type : any , name : string , namespaceURI : string ) : Node ;
    load : (xmlSource : string ) => boolean ;
    loadXML : (xmlString : string ) => boolean ;
    nodeFromID (id : string ) : Node ;
    ondataavailable ( ...a : any [] ) : any ;
    onreadystatechange ( ...a : any [] ) : any ;
    ontransformnode ( ...a : any [] ) : any ;
    parseError : Object ;
    preserveWhiteSpace : boolean ;
    readyState : number ;
    resolveExternals : boolean ;
    setProperty (name : string , value : any ) : any ;
    url : string ;
    validateOnParse : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ClipboardData extends ClipboardData_Instance {
  }
  class ClipboardData_Instance {
    private noStructuralTyping_: any;
    clearData (opt_type ? : string ) : any ;
    getData (type : string ) : string ;
    setData (type : string , data : string ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class History extends History_Instance {
  }
  class History_Instance {
    private noStructuralTyping_: any;
    back (opt_distance ? : number ) : any ;
    forward ( ) : any ;
    go (delta : number | string ) : any ;
    length : number ;
    /**
     * Pushes a new state into the session history.
     * @param data New state.
     * @param title The title for a new session history entry.
     * @param opt_url The URL for a new session history entry.
     */
    pushState (data : any , title : string , opt_url ? : string ) : any ;
    /**
     * Replaces the current state in the session history.
     * @param data New state.
     * @param title The title for a session history entry.
     * @param opt_url The URL for a new session history entry.
     */
    replaceState (data : any , title : string , opt_url ? : string ) : any ;
    /**
     * Pending state object.
     */
    state : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ControlRange extends ControlRange_Instance {
  }
  class ControlRange_Instance {
    private noStructuralTyping_: any;
    add : any ;
    addElement : any ;
    execCommand : any ;
    item : any ;
    queryCommandEnabled : any ;
    queryCommandIndeterm : any ;
    queryCommandState : any ;
    queryCommandSupported : any ;
    queryCommandValue : any ;
    remove : any ;
    scrollIntoView : any ;
    select : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextRange extends TextRange_Instance {
  }
  class TextRange_Instance {
    private noStructuralTyping_: any;
    boundingHeight : any ;
    boundingLeft : any ;
    boundingTop : any ;
    boundingWidth : any ;
    collapse : any ;
    compareEndPoints : any ;
    duplicate : any ;
    execCommand : any ;
    expand : any ;
    findText : any ;
    getBookmark : any ;
    getBoundingClientRect : any ;
    getClientRects : any ;
    htmlText : any ;
    inRange : any ;
    isEqual : any ;
    move : any ;
    moveEnd : any ;
    moveStart : any ;
    moveToBookmark : any ;
    moveToElementText : any ;
    moveToPoint : any ;
    offsetLeft : any ;
    offsetTop : any ;
    parentElement : any ;
    pasteHTML : any ;
    queryCommandEnabled : any ;
    queryCommandIndeterm : any ;
    queryCommandState : any ;
    queryCommandSupported : any ;
    queryCommandValue : any ;
    scrollIntoView : any ;
    select : any ;
    setEndPoint : any ;
    text : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class controlRange extends controlRange_Instance {
  }
  class controlRange_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFiltersCollection extends HTMLFiltersCollection_Instance {
  }
  class HTMLFiltersCollection_Instance {
    private noStructuralTyping_: any;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLFilter extends HTMLFilter_Instance {
  }
  class HTMLFilter_Instance {
    private noStructuralTyping_: any;
    apply ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AlphaFilter extends AlphaFilter_Instance {
  }
  class AlphaFilter_Instance extends HTMLFilter_Instance {
    Opacity : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AlphaImageLoaderFilter extends AlphaImageLoaderFilter_Instance {
  }
  class AlphaImageLoaderFilter_Instance extends HTMLFilter_Instance {
    sizingMethod : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Location extends Location_Instance {
  }
  class Location_Instance {
    private noStructuralTyping_: any;
    ancestorOrigins : DOMStringList ;
    assign (url : string ) : any ;
    hash : string ;
    host : string ;
    hostname : string ;
    href : string ;
    origin : string ;
    pathname : string ;
    port : any ;
    protocol : string ;
    reload (opt_forceReload ? : boolean ) : any ;
    replace (url : string ) : any ;
    search : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * IE implements Cross Origin Resource Sharing (cross-domain XMLHttpRequests)
   * via the XDomainRequest object.
   */
  class XDomainRequest extends XDomainRequest_Instance {
  }
  class XDomainRequest_Instance {
    private noStructuralTyping_: any;
    /**
     * Aborts the request.
     */
    abort ( ) : any ;
    /**
     * The Content-Type of the response, or an empty string.
     */
    contentType : string ;
    /**
     * Called if the request could not be completed. Note that error information is
     * not available.
     */
    onerror : ( ) => any ;
    /**
     * Called when the response has finished.
     */
    onload : ( ) => any ;
    /**
     * Called every time part of the response has been received.
     */
    onprogress : ( ) => any ;
    /**
     * Called if the timeout period has elapsed.
     */
    ontimeout : ( ) => any ;
    /**
     * Sets the method and URL for the request.
     * @param bstrMethod Either "GET" or "POST"
     * @param bstrUrl The target URL
     */
    open : (bstrMethod : string , bstrUrl : string ) => any ;
    /**
     * The current response body.
     */
    responseText : string ;
    /**
     * Sends the request.
     * @param varBody The POST body to send to the server. If omitted, the behavior is identical to sending an empty string.
     */
    send (varBody ? : string ) : any ;
    /**
     * The timeout (in milliseconds) for the request.
     */
    timeout : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MemoryInfo extends MemoryInfo_Instance {
  }
  class MemoryInfo_Instance {
    private noStructuralTyping_: any;
    jsHeapSizeLimit : number ;
    totalJSHeapSize : number ;
    usedJSHeapSize : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ScriptProfileNode extends ScriptProfileNode_Instance {
  }
  class ScriptProfileNode_Instance {
    private noStructuralTyping_: any;
    callUID : number ;
    children : ( ScriptProfileNode ) [] ;
    functionName : string ;
    lineNumber : number ;
    numberOfCalls : number ;
    selfTime : number ;
    totalTime : number ;
    url : string ;
    visible : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ScriptProfile extends ScriptProfile_Instance {
  }
  class ScriptProfile_Instance {
    private noStructuralTyping_: any;
    head : ScriptProfileNode ;
    title : string ;
    uid : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Console extends Console_Instance {
  }
  class Console_Instance {
    private noStructuralTyping_: any;
    assert (condition : any ,  ...var_args : any [] ) : any ;
    clear ( ) : any ;
    count (value : any ) : any ;
    debug ( ...var_args : any [] ) : any ;
    dir (value : any ) : any ;
    dirxml ( ...var_args : any [] ) : any ;
    error ( ...var_args : any [] ) : any ;
    group ( ...var_args : any [] ) : any ;
    groupCollapsed ( ...var_args : any [] ) : any ;
    groupEnd ( ) : any ;
    info ( ...var_args : any [] ) : any ;
    log ( ...var_args : any [] ) : any ;
    markTimeline (value : any ) : any ;
    memory : MemoryInfo ;
    profile (opt_title ? : string ) : any ;
    profileEnd (opt_title ? : string ) : any ;
    profiles : ( ScriptProfile ) [] ;
    table (data : Object , opt_columns ? : any ) : any ;
    time (name : string ) : any ;
    timeEnd (name : string ) : any ;
    timeStamp (value : any ) : any ;
    trace ( ) : void ;
    warn ( ...var_args : any [] ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StyleSheet extends StyleSheet_Instance {
  }
  class StyleSheet_Instance {
    private noStructuralTyping_: any;
    addImport (a : string , b : number ) : number ;
    addRule (a : string , b : string , c ? : number ) : number ;
    cssText : string ;
    disabled : boolean ;
    getExpression (a : string ) : string ;
    href : string ;
    id : string ;
    imports : StyleSheetList ;
    media : MediaList ;
    ownerNode : Node ;
    owningElement : Element ;
    parentStyleSheet : StyleSheet ;
    readOnly : boolean ;
    removeExpression (a : string ) : void ;
    removeImport (a : number ) : any ;
    removeRule (a : number ) : any ;
    rules : CSSRuleList ;
    setExpression (a : string , b : string ) : void ;
    title : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StyleSheetList extends StyleSheetList_Instance {
  }
  class StyleSheetList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : StyleSheet ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaList extends MediaList_Instance {
  }
  class MediaList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : string ;
    length : number ;
    mediaText : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface LinkStyle {
    sheet : StyleSheet ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DocumentStyle extends DocumentStyle_Instance {
  }
  class DocumentStyle_Instance {
    private noStructuralTyping_: any;
    styleSheets : StyleSheetList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSStyleSheet extends CSSStyleSheet_Instance {
  }
  class CSSStyleSheet_Instance extends StyleSheet_Instance {
    cssRules : CSSRuleList ;
    deleteRule (index : number ) : any ;
    insertRule (rule : string , index : number ) : number ;
    ownerRule : CSSRule ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSRuleList extends CSSRuleList_Instance {
  }
  class CSSRuleList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : CSSRule ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSRule extends CSSRule_Instance {
    /**
     * Indicates that the rule is a {@see CSSCharsetRule}.
     */
    static CHARSET_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSFontFaceRule}.
     */
    static FONT_FACE_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSImportRule}.
     */
    static IMPORT_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSMediaRule}.
     */
    static MEDIA_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSPageRule}.
     */
    static PAGE_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSStyleRule}.
     */
    static STYLE_RULE : number ;
    /**
     * Indicates that the rule is a {@see CSSUnknownRule}.
     */
    static UNKNOWN_RULE : number ;
  }
  class CSSRule_Instance {
    private noStructuralTyping_: any;
    cssText : string ;
    parentRule : CSSRule ;
    parentStyleSheet : CSSStyleSheet ;
    style : CSSStyleDeclaration ;
    type : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSStyleRule extends CSSStyleRule_Instance {
  }
  class CSSStyleRule_Instance extends CSSRule_Instance {
    selectorText : string ;
    style : CSSStyleDeclaration ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSMediaRule extends CSSMediaRule_Instance {
  }
  class CSSMediaRule_Instance extends CSSRule_Instance {
    cssRules : CSSRuleList ;
    deleteRule (index : number ) : any ;
    insertRule (rule : string , index : number ) : number ;
    media : MediaList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSFontFaceRule extends CSSFontFaceRule_Instance {
  }
  class CSSFontFaceRule_Instance extends CSSRule_Instance {
    style : CSSStyleDeclaration ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSPageRule extends CSSPageRule_Instance {
  }
  class CSSPageRule_Instance extends CSSRule_Instance {
    selectorText : string ;
    style : CSSStyleDeclaration ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSImportRule extends CSSImportRule_Instance {
  }
  class CSSImportRule_Instance extends CSSRule_Instance {
    href : string ;
    media : MediaList ;
    styleSheet : CSSStyleSheet ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSCharsetRule extends CSSCharsetRule_Instance {
  }
  class CSSCharsetRule_Instance extends CSSRule_Instance {
    encoding : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSUnknownRule extends CSSUnknownRule_Instance {
  }
  class CSSUnknownRule_Instance extends CSSRule_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSStyleDeclaration extends CSSStyleDeclaration_Instance {
  }
  class CSSStyleDeclaration_Instance extends CSSProperties_Instance {
    cssText : string ;
    getAttribute (name : string , opt_flags ? : number ) : string | number | boolean ;
    getExpression (name : string ) : string | number | boolean ;
    getPropertyCSSValue (propertyName : string ) : CSSValue ;
    getPropertyPriority (propertyName : string ) : string ;
    getPropertyValue (propertyName : string ) : string ;
    item (index : number ) : string ;
    length : number ;
    parentRule : CSSRule ;
    removeAttribute (name : string , opt_flags ? : number ) : boolean ;
    removeExpression (name : string ) : boolean ;
    removeProperty (propertyName : string ) : string ;
    setAttribute (name : string , value : any , opt_flags ? : number ) : any ;
    setExpression (name : string , expr : string , opt_language ? : string ) : void ;
    setProperty (propertyName : string , value : string , opt_priority ? : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSValue extends CSSValue_Instance {
    static CSS_CUSTOM : number ;
    static CSS_INHERIT : number ;
    static CSS_PRIMITIVE_VALUE : number ;
    static CSS_VALUE_LIST : number ;
  }
  class CSSValue_Instance {
    private noStructuralTyping_: any;
    cssText : string ;
    cssValueType : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSPrimitiveValue extends CSSPrimitiveValue_Instance {
    static CSS_ATTR : number ;
    static CSS_CM : number ;
    static CSS_COUNTER : number ;
    static CSS_DEG : number ;
    static CSS_DIMENSION : number ;
    static CSS_EMS : number ;
    static CSS_EXS : number ;
    static CSS_GRAD : number ;
    static CSS_HZ : number ;
    static CSS_IDENT : number ;
    static CSS_IN : number ;
    static CSS_KHZ : number ;
    static CSS_MM : number ;
    static CSS_MS : number ;
    static CSS_NUMBER : number ;
    static CSS_PC : number ;
    static CSS_PERCENTAGE : number ;
    static CSS_PT : number ;
    static CSS_PX : number ;
    static CSS_RAD : number ;
    static CSS_RECT : number ;
    static CSS_RGBCOLOR : number ;
    static CSS_S : number ;
    static CSS_STRING : number ;
    static CSS_UNKNOWN : number ;
    static CSS_URI : number ;
  }
  class CSSPrimitiveValue_Instance extends CSSValue_Instance {
    getCounterValue ( ) : Counter ;
    getFloatValue (unitType : number ) : number ;
    getRGBColorValue ( ) : RGBColor ;
    getRectValue ( ) : Rect ;
    getStringValue ( ) : string ;
    primitiveType : number ;
    setFloatValue (unitType : number , floatValue : number ) : void ;
    setStringValue (stringType : number , stringValue : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSValueList extends CSSValueList_Instance {
  }
  class CSSValueList_Instance extends CSSValue_Instance {
    item (index : number ) : CSSValue ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RGBColor extends RGBColor_Instance {
  }
  class RGBColor_Instance {
    private noStructuralTyping_: any;
    blue : CSSPrimitiveValue ;
    green : CSSPrimitiveValue ;
    red : CSSPrimitiveValue ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Rect extends Rect_Instance {
  }
  class Rect_Instance {
    private noStructuralTyping_: any;
    bottom : CSSPrimitiveValue ;
    left : CSSPrimitiveValue ;
    right : CSSPrimitiveValue ;
    top : CSSPrimitiveValue ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Counter extends Counter_Instance {
  }
  class Counter_Instance {
    private noStructuralTyping_: any;
    identifier : string ;
    listStyle : string ;
    separator : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ViewCSS extends ViewCSS_Instance {
  }
  class ViewCSS_Instance {
    private noStructuralTyping_: any;
    getComputedStyle (elt : Element , opt_pseudoElt ? : string ) : CSSStyleDeclaration ;
    getMatchedCSSRules (element : Element , pseudoElement : string , opt_authorOnly ? : boolean ) : CSSRuleList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DocumentCSS extends DocumentCSS_Instance {
  }
  class DocumentCSS_Instance {
    private noStructuralTyping_: any;
    getOverrideStyle (elt : Element , pseudoElt : string ) : CSSStyleDeclaration ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMImplementationCSS extends DOMImplementationCSS_Instance {
  }
  class DOMImplementationCSS_Instance {
    private noStructuralTyping_: any;
    createCSSStyleSheet (title : string , media : string ) : CSSStyleSheet ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ElementCSSInlineStyle extends ElementCSSInlineStyle_Instance {
  }
  class ElementCSSInlineStyle_Instance {
    private noStructuralTyping_: any;
    style : CSSStyleDeclaration ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSProperties extends CSSProperties_Instance {
  }
  class CSSProperties_Instance {
    private noStructuralTyping_: any;
    MozAppearance : string ;
    MozBackfaceVisibility : string ;
    MozBackgroundClip : string ;
    MozBackgroundInlinePolicy : string ;
    MozBackgroundOrigin : string ;
    MozBinding : string ;
    MozBorderBottomColors : string ;
    MozBorderEnd : string ;
    MozBorderEndColor : string ;
    MozBorderEndStyle : string ;
    MozBorderEndWidth : string ;
    MozBorderImage : string ;
    MozBorderLeftColors : string ;
    MozBorderRadius : string ;
    MozBorderRadiusBottomleft : string ;
    MozBorderRadiusBottomright : string ;
    MozBorderRadiusTopleft : string ;
    MozBorderRadiusTopright : string ;
    MozBorderRightColors : string ;
    MozBorderStart : string ;
    MozBorderStartColor : string ;
    MozBorderStartStyle : string ;
    MozBorderStartWidth : string ;
    MozBorderTopColors : string ;
    MozBoxAlign : string ;
    MozBoxDirection : string ;
    MozBoxFlex : string ;
    MozBoxOrdinalGroup : string ;
    MozBoxOrient : string ;
    MozBoxPack : string ;
    MozBoxShadow : string ;
    MozBoxSizing : string ;
    MozColumnCount : string ;
    MozColumnGap : string ;
    MozColumnRule : string ;
    MozColumnRuleColor : string ;
    MozColumnRuleStyle : string ;
    MozColumnRuleWidth : string ;
    MozColumnWidth : string ;
    MozFloatEdge : string ;
    MozFontFeatureSettings : string ;
    MozFontLanguageOverride : string ;
    MozForceBrokenImageIcon : string ;
    MozImageRegion : string ;
    MozMarginEnd : string ;
    MozMarginStart : string ;
    MozOpacity : number | string ;
    MozOutline : string ;
    MozOutlineColor : string ;
    MozOutlineOffset : string ;
    MozOutlineRadius : string ;
    MozOutlineRadiusBottomleft : string ;
    MozOutlineRadiusBottomright : string ;
    MozOutlineRadiusTopleft : string ;
    MozOutlineRadiusTopright : string ;
    MozOutlineStyle : string ;
    MozOutlineWidth : string ;
    MozPaddingEnd : string ;
    MozPaddingStart : string ;
    MozPerspective : string ;
    MozStackSizing : string ;
    MozTabSize : string ;
    MozTransform : string ;
    MozTransformOrigin : string ;
    MozTransition : string ;
    MozTransitionDelay : string ;
    MozTransitionDuration : string ;
    MozTransitionProperty : string ;
    MozTransitionTimingFunction : string ;
    MozUserFocus : string ;
    MozUserInput : string ;
    MozUserModify : string ;
    MozUserSelect : string ;
    MozWindowShadow : string ;
    MsAccelerator : string ;
    MsBackgroundPositionX : string ;
    MsBackgroundPositionY : string ;
    MsBehavior : string ;
    MsBlockProgression : string ;
    MsFilter : string ;
    MsImeMode : string ;
    MsInterpolationMode : string ;
    MsLayoutGrid : string ;
    MsLayoutGridChar : string ;
    MsLayoutGridLine : string ;
    MsLayoutGridMode : string ;
    MsLayoutGridType : string ;
    MsLineBreak : string ;
    MsLineGridMode : string ;
    MsOverflowX : string ;
    MsOverflowY : string ;
    MsScrollbar3dlightColor : string ;
    MsScrollbarArrowColor : string ;
    MsScrollbarBaseColor : string ;
    MsScrollbarDarkshadowColor : string ;
    MsScrollbarFaceColor : string ;
    MsScrollbarHighlightColor : any ;
    MsScrollbarShadowColor : string ;
    MsScrollbarTrackColor : string ;
    MsTextAlignLast : string ;
    MsTextAutospace : string ;
    MsTextJustify : string ;
    MsTextKashidaSpace : string ;
    MsTextOverflow : string ;
    MsTextUnderlinePosition : string ;
    MsWordBreak : string ;
    MsWordWrap : string ;
    MsWritingMode : string ;
    MsZoom : string ;
    WebkitAlignContent : string ;
    WebkitAlignItems : string ;
    WebkitAlignSelf : string ;
    WebkitAnimation : string ;
    WebkitAnimationDelay : string ;
    WebkitAnimationDirection : string ;
    WebkitAnimationDuration : string ;
    WebkitAnimationFillMode : string ;
    WebkitAnimationIterationCount : string ;
    WebkitAnimationName : string ;
    WebkitAnimationPlayState : string ;
    WebkitAnimationTimingFunction : string ;
    WebkitAppRegion : string ;
    WebkitAppearance : string ;
    WebkitAspectRatio : string ;
    WebkitBackfaceVisibility : string ;
    WebkitBackgroundClip : string ;
    WebkitBackgroundComposite : string ;
    WebkitBackgroundOrigin : string ;
    WebkitBackgroundSize : string ;
    WebkitBinding : string ;
    WebkitBlendMode : string ;
    WebkitBorderAfter : string ;
    WebkitBorderAfterColor : string ;
    WebkitBorderAfterStyle : string ;
    WebkitBorderAfterWidth : string ;
    WebkitBorderBefore : string ;
    WebkitBorderBeforeColor : string ;
    WebkitBorderBeforeStyle : string ;
    WebkitBorderBeforeWidth : string ;
    WebkitBorderBottomLeftRadius : string ;
    WebkitBorderBottomRightRadius : string ;
    WebkitBorderEnd : string ;
    WebkitBorderEndColor : string ;
    WebkitBorderEndStyle : string ;
    WebkitBorderEndWidth : string ;
    WebkitBorderFit : string ;
    WebkitBorderHorizontalSpacing : string ;
    WebkitBorderImage : string ;
    WebkitBorderRadius : string ;
    WebkitBorderStart : string ;
    WebkitBorderStartColor : string ;
    WebkitBorderStartStyle : string ;
    WebkitBorderStartWidth : string ;
    WebkitBorderTopLeftRadius : string ;
    WebkitBorderTopRightRadius : string ;
    WebkitBorderVerticalSpacing : string ;
    WebkitBoxAlign : string ;
    WebkitBoxDecorationBreak : string ;
    WebkitBoxDirection : string ;
    WebkitBoxFlex : string ;
    WebkitBoxFlexGroup : string ;
    WebkitBoxLines : string ;
    WebkitBoxOrdinalGroup : string ;
    WebkitBoxOrient : string ;
    WebkitBoxPack : string ;
    WebkitBoxReflect : string ;
    WebkitBoxShadow : string ;
    WebkitBoxSizing : string ;
    WebkitColorCorrection : string ;
    WebkitColumnAxis : string ;
    WebkitColumnBreakAfter : string ;
    WebkitColumnBreakBefore : string ;
    WebkitColumnBreakInside : string ;
    WebkitColumnCount : string ;
    WebkitColumnGap : string ;
    WebkitColumnProgression : string ;
    WebkitColumnRule : string ;
    WebkitColumnRuleColor : string ;
    WebkitColumnRuleStyle : string ;
    WebkitColumnRuleWidth : string ;
    WebkitColumnSpan : string ;
    WebkitColumnWidth : string ;
    WebkitColumns : string ;
    WebkitDashboardRegion : string ;
    WebkitFilter : string ;
    WebkitFlex : string ;
    WebkitFlexBasis : string ;
    WebkitFlexDirection : string ;
    WebkitFlexFlow : string ;
    WebkitFlexGrow : string ;
    WebkitFlexShrink : string ;
    WebkitFlexWrap : string ;
    WebkitFlowFrom : string ;
    WebkitFlowInto : string ;
    WebkitFontSizeDelta : string ;
    WebkitFontSmoothing : string ;
    WebkitGridColumn : string ;
    WebkitGridColumns : string ;
    WebkitGridRow : string ;
    WebkitGridRows : string ;
    WebkitHighlight : string ;
    WebkitHyphenateCharacter : string ;
    WebkitHyphenateLimitAfter : string ;
    WebkitHyphenateLimitBefore : string ;
    WebkitHyphenateLimitLines : string ;
    WebkitHyphens : string ;
    WebkitJustifyContent : string ;
    WebkitLineAlign : string ;
    WebkitLineBoxContain : string ;
    WebkitLineBreak : string ;
    WebkitLineClamp : string ;
    WebkitLineGrid : string ;
    WebkitLineSnap : string ;
    WebkitLocale : string ;
    WebkitLogicalHeight : string ;
    WebkitLogicalWidth : string ;
    WebkitMarginAfter : string ;
    WebkitMarginAfterCollapse : string ;
    WebkitMarginBefore : string ;
    WebkitMarginBeforeCollapse : string ;
    WebkitMarginBottomCollapse : string ;
    WebkitMarginCollapse : string ;
    WebkitMarginEnd : string ;
    WebkitMarginStart : string ;
    WebkitMarginTopCollapse : string ;
    WebkitMarquee : string ;
    WebkitMarqueeDirection : string ;
    WebkitMarqueeIncrement : string ;
    WebkitMarqueeRepetition : string ;
    WebkitMarqueeSpeed : string ;
    WebkitMarqueeStyle : string ;
    WebkitMask : string ;
    WebkitMaskAttachment : string ;
    WebkitMaskBoxImage : string ;
    WebkitMaskBoxImageOutset : string ;
    WebkitMaskBoxImageRepeat : string ;
    WebkitMaskBoxImageSlice : string ;
    WebkitMaskBoxImageSource : string ;
    WebkitMaskBoxImageWidth : string ;
    WebkitMaskClip : string ;
    WebkitMaskComposite : string ;
    WebkitMaskImage : string ;
    WebkitMaskOrigin : string ;
    WebkitMaskPosition : string ;
    WebkitMaskPositionX : string ;
    WebkitMaskPositionY : string ;
    WebkitMaskRepeat : string ;
    WebkitMaskRepeatX : string ;
    WebkitMaskRepeatY : string ;
    WebkitMaskSize : string ;
    WebkitMatchNearestMailBlockquoteColor : string ;
    WebkitMaxLogicalHeight : string ;
    WebkitMaxLogicalWidth : string ;
    WebkitMinLogicalHeight : string ;
    WebkitMinLogicalWidth : string ;
    WebkitNbspMode : string ;
    WebkitOrder : string ;
    WebkitOverflowScrolling : string ;
    WebkitPaddingAfter : string ;
    WebkitPaddingBefore : string ;
    WebkitPaddingEnd : string ;
    WebkitPaddingStart : string ;
    WebkitPerspective : string ;
    WebkitPerspectiveOrigin : string ;
    WebkitPerspectiveOriginX : string ;
    WebkitPerspectiveOriginY : string ;
    WebkitPrintColorAdjust : string ;
    WebkitRegionBreakAfter : string ;
    WebkitRegionBreakBefore : string ;
    WebkitRegionBreakInside : string ;
    WebkitRegionOverflow : string ;
    WebkitRtlOrdering : string ;
    WebkitRubyPosition : string ;
    WebkitShapeInside : string ;
    WebkitShapeMargin : string ;
    WebkitShapeOutside : string ;
    WebkitShapePadding : string ;
    WebkitTapHighlightColor : string ;
    WebkitTextAlignLast : string ;
    WebkitTextCombine : string ;
    WebkitTextDecorationLine : string ;
    WebkitTextDecorationStyle : string ;
    WebkitTextDecorationsInEffect : string ;
    WebkitTextEmphasis : string ;
    WebkitTextEmphasisColor : string ;
    WebkitTextEmphasisPosition : string ;
    WebkitTextEmphasisStyle : string ;
    WebkitTextFillColor : string ;
    WebkitTextOrientation : string ;
    WebkitTextSecurity : string ;
    WebkitTextSizeAdjust : string ;
    WebkitTextStroke : string ;
    WebkitTextStrokeColor : string ;
    WebkitTextStrokeWidth : string ;
    WebkitTransform : string ;
    WebkitTransformOrigin : string ;
    WebkitTransformOriginX : string ;
    WebkitTransformOriginY : string ;
    WebkitTransformOriginZ : string ;
    WebkitTransformStyle : string ;
    WebkitTransition : string ;
    WebkitTransitionDelay : string ;
    WebkitTransitionDuration : string ;
    WebkitTransitionProperty : string ;
    WebkitTransitionRepeatCount : string ;
    WebkitTransitionTimingFunction : string ;
    WebkitUserDrag : string ;
    WebkitUserModify : string ;
    WebkitUserSelect : string ;
    WebkitWrap : string ;
    WebkitWrapFlow : string ;
    WebkitWrapThrough : string ;
    WebkitWritingMode : string ;
    azimuth : string ;
    backfaceVisibility : string ;
    background : string ;
    backgroundAttachment : string ;
    backgroundColor : string ;
    backgroundImage : string ;
    backgroundPosition : string ;
    backgroundPositionX : string ;
    backgroundPositionY : string ;
    backgroundRepeat : string ;
    backgroundSize : string ;
    behavior : any ;
    border : string ;
    borderBottom : string ;
    borderBottomColor : string ;
    borderBottomLeftRadius : string | number ;
    borderBottomRightRadius : string | number ;
    borderBottomStyle : string ;
    borderBottomWidth : string | number ;
    borderCollapse : string ;
    borderColor : string ;
    borderImage : string ;
    borderImageOutset : string | number ;
    borderImageRepeat : string ;
    borderImageSlice : string | number ;
    borderImageSource : string ;
    borderImageWidth : string | number ;
    borderLeft : string ;
    borderLeftColor : string ;
    borderLeftStyle : string ;
    borderLeftWidth : string | number ;
    borderRadius : string | number ;
    borderRight : string ;
    borderRightColor : string ;
    borderRightStyle : string ;
    borderRightWidth : string | number ;
    borderSpacing : string ;
    borderStyle : string ;
    borderTop : string ;
    borderTopColor : string ;
    borderTopLeftRadius : string | number ;
    borderTopRightRadius : string | number ;
    borderTopStyle : string ;
    borderTopWidth : string | number ;
    borderWidth : string | number ;
    bottom : string | number ;
    boxShadow : string ;
    boxSizing : string ;
    captionSide : string ;
    clear : string ;
    clip : string ;
    color : string ;
    content : string ;
    counterIncrement : string ;
    counterReset : string ;
    cssFloat : string ;
    /**
     * This is not an official part of the W3C spec. In practice, this is a settable
     * property that works cross-browser. It is used in goog.dom.setProperties() and
     * needs to be extern'd so the --disambiguate_properties JS compiler pass works.
     */
    cssText : string ;
    cue : string ;
    cueAfter : string ;
    cueBefore : string ;
    cursor : string ;
    direction : string ;
    display : string ;
    elevation : string ;
    emptyCells : string ;
    font : string ;
    fontFamily : string ;
    fontSize : string | number ;
    fontSizeAdjust : string ;
    fontStretch : string ;
    fontStyle : string ;
    fontVariant : string ;
    fontWeight : string ;
    height : string | number ;
    imeMode : string ;
    left : string | number ;
    letterSpacing : string ;
    lineHeight : string | number ;
    listStyle : string ;
    listStyleImage : string ;
    listStylePosition : string ;
    listStyleType : string ;
    margin : string | number ;
    marginBottom : string | number ;
    marginLeft : string | number ;
    marginRight : string | number ;
    marginTop : string | number ;
    markerOffset : string ;
    marks : string ;
    maxHeight : string | number ;
    maxWidth : string | number ;
    minHeight : string | number ;
    minWidth : string | number ;
    msContentZooming : string ;
    msInterpolationMode : string ;
    msTouchAction : string ;
    msTransform : string ;
    msTransition : string ;
    opacity : string | number ;
    orphans : string ;
    outline : string ;
    outlineColor : string ;
    outlineStyle : string ;
    outlineWidth : string | number ;
    overflow : string ;
    overflowX : string ;
    overflowY : string ;
    padding : string | number ;
    paddingBottom : string | number ;
    paddingLeft : string | number ;
    paddingRight : string | number ;
    paddingTop : string | number ;
    page : string ;
    pageBreakAfter : string ;
    pageBreakBefore : string ;
    pageBreakInside : string ;
    pause : string ;
    pauseAfter : string ;
    pauseBefore : string ;
    perspective : string ;
    perspectiveOrigin : string | number ;
    pitch : string ;
    pitchRange : string ;
    pixelHeight : number ;
    pixelLeft : number ;
    pixelTop : number ;
    pixelWidth : number ;
    playDuring : string ;
    pointerEvents : string ;
    position : string ;
    quotes : string ;
    resize : string ;
    richness : string ;
    right : string | number ;
    size : string ;
    speak : string ;
    speakHeader : string ;
    speakNumeral : string ;
    speakPunctuation : string ;
    speechRate : string ;
    stress : string ;
    styleFloat : string ;
    tableLayout : string ;
    textAlign : string ;
    textDecoration : string ;
    textIndent : string ;
    textOverflow : string ;
    textShadow : string ;
    textTransform : string ;
    top : string | number ;
    transform : string ;
    transformOrigin : string | number ;
    transformStyle : string ;
    transition : string ;
    transitionDelay : string ;
    transitionDuration : string ;
    transitionProperty : string ;
    transitionTimingFunction : string ;
    unicodeBidi : string ;
    verticalAlign : string ;
    visibility : string ;
    voiceFamily : string ;
    volume : string ;
    webkitAlignContent : string ;
    webkitAlignItems : string ;
    webkitAlignSelf : string ;
    webkitAnimation : string ;
    webkitAnimationDelay : string ;
    webkitAnimationDirection : string ;
    webkitAnimationDuration : string ;
    webkitAnimationFillMode : string ;
    webkitAnimationIterationCount : string ;
    webkitAnimationName : string ;
    webkitAnimationPlayState : string ;
    webkitAnimationTimingFunction : string ;
    webkitAppRegion : string ;
    webkitAppearance : string ;
    webkitAspectRatio : string ;
    webkitBackfaceVisibility : string ;
    webkitBackgroundClip : string ;
    webkitBackgroundComposite : string ;
    webkitBackgroundOrigin : string ;
    webkitBackgroundSize : string ;
    webkitBinding : string ;
    webkitBlendMode : string ;
    webkitBorderAfter : string ;
    webkitBorderAfterColor : string ;
    webkitBorderAfterStyle : string ;
    webkitBorderAfterWidth : string ;
    webkitBorderBefore : string ;
    webkitBorderBeforeColor : string ;
    webkitBorderBeforeStyle : string ;
    webkitBorderBeforeWidth : string ;
    webkitBorderBottomLeftRadius : string ;
    webkitBorderBottomRightRadius : string ;
    webkitBorderEnd : string ;
    webkitBorderEndColor : string ;
    webkitBorderEndStyle : string ;
    webkitBorderEndWidth : string ;
    webkitBorderFit : string ;
    webkitBorderHorizontalSpacing : string ;
    webkitBorderImage : string ;
    webkitBorderRadius : string ;
    webkitBorderStart : string ;
    webkitBorderStartColor : string ;
    webkitBorderStartStyle : string ;
    webkitBorderStartWidth : string ;
    webkitBorderTopLeftRadius : string ;
    webkitBorderTopRightRadius : string ;
    webkitBorderVerticalSpacing : string ;
    webkitBoxAlign : string ;
    webkitBoxDecorationBreak : string ;
    webkitBoxDirection : string ;
    webkitBoxFlex : string ;
    webkitBoxFlexGroup : string ;
    webkitBoxLines : string ;
    webkitBoxOrdinalGroup : string ;
    webkitBoxOrient : string ;
    webkitBoxPack : string ;
    webkitBoxReflect : string ;
    webkitBoxShadow : string ;
    webkitBoxSizing : string ;
    webkitColorCorrection : string ;
    webkitColumnAxis : string ;
    webkitColumnBreakAfter : string ;
    webkitColumnBreakBefore : string ;
    webkitColumnBreakInside : string ;
    webkitColumnCount : string ;
    webkitColumnGap : string ;
    webkitColumnProgression : string ;
    webkitColumnRule : string ;
    webkitColumnRuleColor : string ;
    webkitColumnRuleStyle : string ;
    webkitColumnRuleWidth : string ;
    webkitColumnSpan : string ;
    webkitColumnWidth : string ;
    webkitColumns : string ;
    webkitDashboardRegion : string ;
    webkitFilter : string ;
    webkitFlex : string ;
    webkitFlexBasis : string ;
    webkitFlexDirection : string ;
    webkitFlexFlow : string ;
    webkitFlexGrow : string ;
    webkitFlexShrink : string ;
    webkitFlexWrap : string ;
    webkitFlowFrom : string ;
    webkitFlowInto : string ;
    webkitFontSizeDelta : string ;
    webkitFontSmoothing : string ;
    webkitGridColumn : string ;
    webkitGridColumns : string ;
    webkitGridRow : string ;
    webkitGridRows : string ;
    webkitHighlight : string ;
    webkitHyphenateCharacter : string ;
    webkitHyphenateLimitAfter : string ;
    webkitHyphenateLimitBefore : string ;
    webkitHyphenateLimitLines : string ;
    webkitHyphens : string ;
    webkitJustifyContent : string ;
    webkitLineAlign : string ;
    webkitLineBoxContain : string ;
    webkitLineBreak : string ;
    webkitLineClamp : string ;
    webkitLineGrid : string ;
    webkitLineSnap : string ;
    webkitLocale : string ;
    webkitLogicalHeight : string ;
    webkitLogicalWidth : string ;
    webkitMarginAfter : string ;
    webkitMarginAfterCollapse : string ;
    webkitMarginBefore : string ;
    webkitMarginBeforeCollapse : string ;
    webkitMarginBottomCollapse : string ;
    webkitMarginCollapse : string ;
    webkitMarginEnd : string ;
    webkitMarginStart : string ;
    webkitMarginTopCollapse : string ;
    webkitMarquee : string ;
    webkitMarqueeDirection : string ;
    webkitMarqueeIncrement : string ;
    webkitMarqueeRepetition : string ;
    webkitMarqueeSpeed : string ;
    webkitMarqueeStyle : string ;
    webkitMask : string ;
    webkitMaskAttachment : string ;
    webkitMaskBoxImage : string ;
    webkitMaskBoxImageOutset : string ;
    webkitMaskBoxImageRepeat : string ;
    webkitMaskBoxImageSlice : string ;
    webkitMaskBoxImageSource : string ;
    webkitMaskBoxImageWidth : string ;
    webkitMaskClip : string ;
    webkitMaskComposite : string ;
    webkitMaskImage : string ;
    webkitMaskOrigin : string ;
    webkitMaskPosition : string ;
    webkitMaskPositionX : string ;
    webkitMaskPositionY : string ;
    webkitMaskRepeat : string ;
    webkitMaskRepeatX : string ;
    webkitMaskRepeatY : string ;
    webkitMaskSize : string ;
    webkitMatchNearestMailBlockquoteColor : string ;
    webkitMaxLogicalHeight : string ;
    webkitMaxLogicalWidth : string ;
    webkitMinLogicalHeight : string ;
    webkitMinLogicalWidth : string ;
    webkitNbspMode : string ;
    webkitOrder : string ;
    webkitOverflowScrolling : string ;
    webkitPaddingAfter : string ;
    webkitPaddingBefore : string ;
    webkitPaddingEnd : string ;
    webkitPaddingStart : string ;
    webkitPerspective : string ;
    webkitPerspectiveOrigin : string ;
    webkitPerspectiveOriginX : string ;
    webkitPerspectiveOriginY : string ;
    webkitPrintColorAdjust : string ;
    webkitRegionBreakAfter : string ;
    webkitRegionBreakBefore : string ;
    webkitRegionBreakInside : string ;
    webkitRegionOverflow : string ;
    webkitRtlOrdering : string ;
    webkitRubyPosition : string ;
    webkitShapeInside : string ;
    webkitShapeMargin : string ;
    webkitShapeOutside : string ;
    webkitShapePadding : string ;
    webkitTapHighlightColor : string ;
    webkitTextAlignLast : string ;
    webkitTextCombine : string ;
    webkitTextDecorationLine : string ;
    webkitTextDecorationStyle : string ;
    webkitTextDecorationsInEffect : string ;
    webkitTextEmphasis : string ;
    webkitTextEmphasisColor : string ;
    webkitTextEmphasisPosition : string ;
    webkitTextEmphasisStyle : string ;
    webkitTextFillColor : string ;
    webkitTextOrientation : string ;
    webkitTextSecurity : string ;
    webkitTextSizeAdjust : string ;
    webkitTextStroke : string ;
    webkitTextStrokeColor : string ;
    webkitTextStrokeWidth : string ;
    webkitTransform : string ;
    webkitTransformOrigin : string ;
    webkitTransformOriginX : string ;
    webkitTransformOriginY : string ;
    webkitTransformOriginZ : string ;
    webkitTransformStyle : string ;
    webkitTransition : string ;
    webkitTransitionDelay : string ;
    webkitTransitionDuration : string ;
    webkitTransitionProperty : string ;
    webkitTransitionRepeatCount : string ;
    webkitTransitionTimingFunction : string ;
    webkitUserDrag : string ;
    webkitUserModify : string ;
    webkitUserSelect : string ;
    webkitWrap : string ;
    webkitWrapFlow : string ;
    webkitWrapThrough : string ;
    webkitWritingMode : string ;
    whiteSpace : string ;
    widows : string ;
    width : string | number ;
    wordSpacing : string ;
    wordWrap : string ;
    writingMode : string ;
    zIndex : string | number ;
    zoom : string | number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaQueryList extends MediaQueryList_Instance {
  }
  class MediaQueryList_Instance {
    private noStructuralTyping_: any;
    addListener (listener : (a : MediaQueryList ) => void ) : any ;
    matches : boolean ;
    media : string ;
    removeListener (listener : (a : MediaQueryList ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Screen extends Screen_Instance {
  }
  class Screen_Instance {
    private noStructuralTyping_: any;
    availHeight : number ;
    availLeft : number ;
    availTop : number ;
    availWidth : number ;
    colorDepth : number ;
    deviceXDPI : number ;
    height : number ;
    left : number ;
    logicalXDPI : number ;
    logicalYDPI : number ;
    pixelDepth : number ;
    top : number ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CaretPosition extends CaretPosition_Instance {
  }
  class CaretPosition_Instance {
    private noStructuralTyping_: any;
    offset : number ;
    offsetNode : Node ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ClientRectList extends ClientRectList_Instance {
  }
  class ClientRectList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : ClientRect ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ClientRect extends ClientRect_Instance {
  }
  class ClientRect_Instance {
    private noStructuralTyping_: any;
    bottom : number ;
    height : number ;
    left : number ;
    right : number ;
    top : number ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSInterface extends CSSInterface_Instance {
  }
  class CSSInterface_Instance {
    private noStructuralTyping_: any;
    escape (ident : string ) : string ;
    supports (property : string , opt_value ? : string ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FontFace extends FontFace_Instance {
  }
  class FontFace_Instance {
    private noStructuralTyping_: any;
    constructor (fontFamily : string , source : string | ArrayBuffer | ArrayBufferView , descriptors : { featureSettings ? : string , stretch ? : string , style ? : string , unicodeRange ? : string , variant ? : string , weight ? : string } ) ;
    family : string ;
    featureSettings : string ;
    load : ( ) => Promise < FontFace > ;
    status : FontFaceLoadStatus ;
    stretch : string ;
    style : string ;
    unicodeRange : string ;
    variant : string ;
    weight : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface FontFaceSet {
    add (value : FontFace ) : any ;
    check (font : string , opt_text ? : string ) : boolean ;
    clear ( ) : any ;
    delete (value : FontFace ) : any ;
    forEach (cb : (a : FontFace , b : number , c : FontFaceSet ) => any , opt_selfObj ? : Object ) : any ;
    has (font : FontFace ) : boolean ;
    load : (font : string , opt_text ? : string ) => Promise < FontFace [] > ;
    onloading : (a : Event ) => any ;
    onloadingdone : (a : Event ) => any ;
    onloadingerror : (a : Event ) => any ;
    ready : Promise < FontFaceSet > ;
    status : FontFaceSetLoadStatus ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type FontFaceLoadStatus = string ;
  var FontFaceLoadStatus : {
    ERROR : FontFaceLoadStatus ,
    LOADED : FontFaceLoadStatus ,
    LOADING : FontFaceLoadStatus ,
    UNLOADED : FontFaceLoadStatus ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type FontFaceSetLoadStatus = number ;
  var FontFaceSetLoadStatus : {
    LOADED : FontFaceSetLoadStatus ,
    LOADING : FontFaceSetLoadStatus ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class WebKitPoint extends WebKitPoint_Instance {
  }
  class WebKitPoint_Instance {
    private noStructuralTyping_: any;
    constructor (x : number , y : number ) ;
    x : number ;
    y : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The Touch class represents a single touch on the surface. A touch is the
   * presence or movement of a finger that is part of a unique multi-touch
   * sequence.
   */
  class Touch extends Touch_Instance {
  }
  class Touch_Instance {
    private noStructuralTyping_: any;
    /**
     * The x-coordinate of the touch's location relative to the window's viewport.
     */
    clientX : number ;
    /**
     * The y-coordinate of the touch's location relative to the window's viewport.
     */
    clientY : number ;
    force : number ;
    /**
     * The unique identifier for this touch object.
     */
    identifier : number ;
    /**
     * The x-coordinate of the touch's location in page coordinates.
     */
    pageX : number ;
    /**
     * The y-coordinate of the touch's location in page coordinates.
     */
    pageY : number ;
    radiusX : number ;
    radiusY : number ;
    /**
     * The x-coordinate of the touch's location in screen coordinates.
     */
    screenX : number ;
    /**
     * The y-coordinate of the touch's location in screen coordinates.
     */
    screenY : number ;
    /**
     * The target of this touch.
     */
    target : EventTarget ;
    webkitForce : number ;
    webkitRadiusX : number ;
    webkitRadiusY : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The TouchList class is used to represent a collection of Touch objects.
   */
  class TouchList extends TouchList_Instance {
  }
  class TouchList_Instance {
    private noStructuralTyping_: any;
    identifiedTouch (identifier : number ) : Touch ;
    /**
     * Returns the Touch object at the given index.
     */
    item (index : number ) : Touch ;
    /**
     * The number of Touch objects in this TouchList object.
     */
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The TouchEvent class encapsulates information about a touch event.
   *
   * <p>The system continually sends TouchEvent objects to an application as
   * fingers touch and move across a surface. A touch event provides a snapshot of
   * all touches during a multi-touch sequence, most importantly the touches that
   * are new or have changed for a particular target. A multi-touch sequence
   * begins when a finger first touches the surface. Other fingers may
   * subsequently touch the surface, and all fingers may move across the surface.
   * The sequence ends when the last of these fingers is lifted from the surface.
   * An application receives touch event objects during each phase of any touch.
   * </p>
   *
   * <p>The different types of TouchEvent objects that can occur are:
   * <ul>
   * <li>touchstart - Sent when a finger for a given event touches the surface.
   * <li>touchmove - Sent when a given event moves on the surface.
   * <li>touchend - Sent when a given event lifts from the surface.
   * <li>touchcancel - Sent when the system cancels tracking for the touch.
   * </ul>
   * TouchEvent objects are combined together to form high-level GestureEvent
   * objects that are also sent during a multi-touch sequence.</p>
   */
  class TouchEvent extends TouchEvent_Instance {
  }
  class TouchEvent_Instance extends UIEvent_Instance {
    altKey : boolean ;
    /**
     * A collection of Touch objects representing all touches that changed in this event.
     */
    changedTouches : TouchList ;
    ctrlKey : boolean ;
    /**
     * Initializes a newly created TouchEvent object.
     */
    initTouchEvent (type : string , canBubble : boolean , cancelable : boolean , view : Window , detail : number , screenX : number , screenY : number , clientX : number , clientY : number , ctrlKey : boolean , altKey : boolean , shiftKey : boolean , metaKey : boolean , touches : TouchList , targetTouches : TouchList , changedTouches : TouchList , scale : number , rotation : number ) : any ;
    metaKey : boolean ;
    /**
     * The delta rotation since the start of an event, in degrees, where clockwise
     * is positive and counter-clockwise is negative. The initial value is 0.0.
     */
    rotation : number ;
    /**
     * The distance between two fingers since the start of an event as a multiplier
     * of the initial distance. The initial value is 1.0. If less than 1.0, the
     * gesture is pinch close (to zoom out). If greater than 1.0, the gesture is
     * pinch open (to zoom in).
     */
    scale : number ;
    shiftKey : boolean ;
    /**
     * A collection of Touch objects representing all touches associated with this
     * target.
     */
    targetTouches : TouchList ;
    /**
     * A collection of Touch objects representing all touches associated with this
     * target.
     */
    touches : TouchList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ServiceWorker extends ServiceWorker_Instance {
  }
  class ServiceWorker_Instance extends Worker_Instance {
    onstatechange : (a : Event ) => any ;
    scriptURL : string ;
    state : ServiceWorkerState ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PushSubscription extends PushSubscription_Instance {
  }
  class PushSubscription_Instance {
    private noStructuralTyping_: any;
    endpoint : string ;
    /**
     * Please note there is an intent to deprecate this field in Chrome 43 or 44.
     * See https://www.chromestatus.com/feature/5283829761703936.
     */
    subscriptionId : string ;
    unsubscribe ( ) : Promise < boolean > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PushManager extends PushManager_Instance {
  }
  class PushManager_Instance {
    private noStructuralTyping_: any;
    getSubscription ( ) : Promise < PushSubscription > ;
    subscribe (opt_options ? : { userVisibleOnly ? : boolean } ) : Promise < PushSubscription > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PushMessageData extends PushMessageData_Instance {
  }
  class PushMessageData_Instance {
    private noStructuralTyping_: any;
    arrayBuffer ( ) : ArrayBuffer ;
    blob ( ) : Blob ;
    json ( ) : any ;
    text ( ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PushEvent extends PushEvent_Instance {
  }
  class PushEvent_Instance extends ExtendableEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean } ) ;
    data : PushMessageData ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ServiceWorkerRegistration extends EventTarget {
    active : ServiceWorker ;
    getNotifications (opt_filter ? : { tag ? : string } ) : Promise < ( Notification ) [] > ;
    installing : ServiceWorker ;
    onupdatefound : (a : Event ) => any ;
    pushManager : PushManager ;
    scope : string ;
    showNotification (title : string , opt_options ? : { body ? : string , dir ? : string , icon ? : string , lang ? : string , tag ? : string } ) : Promise < void > ;
    unregister ( ) : Promise < boolean > ;
    update ( ) : any ;
    waiting : ServiceWorker ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ServiceWorkerContainer extends EventTarget {
    controller : ServiceWorker ;
    getRegistration (opt_documentURL ? : string ) : Promise < ServiceWorkerRegistration > ;
    getRegistrations ( ) : Promise < ServiceWorkerRegistration [] > ;
    oncontrollerchange : (a : Event ) => any ;
    onerror : (a : ErrorEvent ) => any ;
    ready : Promise < ServiceWorkerRegistration > ;
    register (scriptURL : string , opt_options ? : { scope : string } ) : Promise < ServiceWorkerRegistration > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
    caches : CacheStorage ;
    clients : ServiceWorkerClients ;
    console : Console ;
    indexedDB : IDBFactory ;
    onactivate : (a : ExtendableEvent ) => any ;
    /**
     * TODO(mtragut): This handler should get a custom event in the future.
     */
    onbeforeevicted : (a : Event ) => any ;
    /**
     * TODO(mtragut): This handler should get a custom event in the future.
     */
    onevicted : (a : Event ) => any ;
    onfetch : (a : FetchEvent ) => any ;
    oninstall : (a : InstallEvent ) => any ;
    onmessage : (a : MessageEvent < any > ) => any ;
    registration : ServiceWorkerRegistration ;
    scope : string ;
    scriptCache : Cache ;
    skipWaiting ( ) : Promise < void > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ServiceWorkerClient extends ServiceWorkerClient_Instance {
  }
  class ServiceWorkerClient_Instance {
    private noStructuralTyping_: any;
    focus ( ) : Promise < any > ;
    focused : boolean ;
    /**
     * // TODO(mtragut): Possibly replace the type with enum ContextFrameType once
     * the enum is defined.
     */
    frameType : string ;
    hidden : boolean ;
    postMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
    ready : Promise < void > ;
    url : string ;
    visibilityState : VisibilityState ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ServiceWorkerClients {
    claim ( ) : Promise < void > ;
    /**
     * Deprecated in Chrome M43+, use matchAll instead. Reference:
     * https://github.com/slightlyoff/ServiceWorker/issues/610.
     * TODO(joeltine): Remove when getAll is fully deprecated.
     */
    getAll (opt_options ? : { includeUncontrolled ? : boolean } ) : Promise < ServiceWorkerClient [] > ;
    matchAll (opt_options ? : { includeUncontrolled ? : boolean } ) : Promise < ServiceWorkerClient [] > ;
    openWindow (url : string ) : Promise < ServiceWorkerClient > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Cache {
    add (request : Request | string ) : Promise < void > ;
    addAll (requests : ( Request | string ) [] ) : Promise < void > ;
    delete (request : Request | string , opt_options ? : { cacheName ? : string , ignoreMethod ? : boolean , ignoreSearch ? : boolean , ignoreVary ? : boolean , prefixMatch ? : boolean } ) : Promise < boolean > ;
    keys (opt_request ? : Request | string , opt_options ? : { cacheName ? : string , ignoreMethod ? : boolean , ignoreSearch ? : boolean , ignoreVary ? : boolean , prefixMatch ? : boolean } ) : Promise < Response [] > ;
    match (request : Request | string , opt_options ? : { cacheName ? : string , ignoreMethod ? : boolean , ignoreSearch ? : boolean , ignoreVary ? : boolean , prefixMatch ? : boolean } ) : Promise < Response > ;
    matchAll (opt_request ? : Request | string , opt_options ? : { cacheName ? : string , ignoreMethod ? : boolean , ignoreSearch ? : boolean , ignoreVary ? : boolean , prefixMatch ? : boolean } ) : Promise < Response [] > ;
    put (request : Request | string , response : Response ) : Promise < void > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface CacheStorage {
    delete (cacheName : string ) : Promise < boolean > ;
    has (cacheName : string ) : Promise < boolean > ;
    keys ( ) : Promise < string [] > ;
    match (request : Request | string , opt_options ? : { cacheName ? : string , ignoreMethod ? : boolean , ignoreSearch ? : boolean , ignoreVary ? : boolean , prefixMatch ? : boolean } ) : Promise < Response > ;
    open : (cacheName : string ) => Promise < Cache > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ExtendableEvent extends ExtendableEvent_Instance {
  }
  class ExtendableEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean } ) ;
    activeWorker : ServiceWorker ;
    waitUntil (f : IThenable < any > ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class InstallEvent extends InstallEvent_Instance {
  }
  class InstallEvent_Instance extends ExtendableEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { activeWorker ? : ServiceWorker , bubbles ? : boolean , cancelable ? : boolean } ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FetchEvent extends FetchEvent_Instance {
  }
  class FetchEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean , client ? : ServiceWorkerClient , isReload ? : boolean , request ? : Request } ) ;
    client : ServiceWorkerClient ;
    default ( ) : Promise < Response > ;
    forwardTo (url : string ) : Promise < Response > ;
    isReload : boolean ;
    request : Request ;
    respondWith (r : Response | Promise < Response > ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type ServiceWorkerState = string ;
  var ServiceWorkerState : {
    ACTIVATED : ServiceWorkerState ,
    ACTIVATING : ServiceWorkerState ,
    INSTALLED : ServiceWorkerState ,
    INSTALLING : ServiceWorkerState ,
    REDUNDANT : ServiceWorkerState ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class HTMLCanvasElement extends HTMLCanvasElement_Instance {
  }
  class HTMLCanvasElement_Instance extends HTMLElement_Instance {
    getContext (contextId : string , opt_args ? : Object ) : Object ;
    height : number ;
    toDataURL (opt_type ? : string ,  ...var_args : any [] ) : string ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CanvasRenderingContext2D extends CanvasRenderingContext2D_Instance {
  }
  class CanvasRenderingContext2D_Instance {
    private noStructuralTyping_: any;
    arc (x : number , y : number , radius : number , startAngle : number , endAngle : number , opt_anticlockwise ? : boolean ) : void ;
    arcTo (x1 : number , y1 : number , x2 : number , y2 : number , radius : number ) : void ;
    beginPath ( ) : void ;
    bezierCurveTo (cp1x : number , cp1y : number , cp2x : number , cp2y : number , x : number , y : number ) : void ;
    canvas : HTMLCanvasElement ;
    clearRect (x : number , y : number , w : number , h : number ) : void ;
    clip (opt_fillRule ? : string ) : void ;
    closePath ( ) : void ;
    createImageData (sw : number , sh : number ) : ImageData ;
    createLinearGradient (x0 : number , y0 : number , x1 : number , y1 : number ) : CanvasGradient ;
    createPattern (image : HTMLImageElement | HTMLCanvasElement , repetition : string ) : CanvasPattern ;
    createRadialGradient (x0 : number , y0 : number , r0 : number , x1 : number , y1 : number , r1 : number ) : CanvasGradient ;
    drawImage (image : HTMLImageElement | HTMLCanvasElement | HTMLVideoElement , dx : number , dy : number , opt_dw ? : number , opt_dh ? : number , opt_sx ? : number , opt_sy ? : number , opt_sw ? : number , opt_sh ? : number ) : void ;
    fill (opt_fillRule ? : string ) : void ;
    fillColor : string ;
    fillRect (x : number , y : number , w : number , h : number ) : void ;
    fillStyle : string ;
    fillText (text : string , x : number , y : number , opt_maxWidth ? : number ) : void ;
    font : string ;
    getImageData (sx : number , sy : number , sw : number , sh : number ) : ImageData ;
    getLineDash ( ) : number [] ;
    globalAlpha : number ;
    globalCompositeOperation : string ;
    isPointInPath (x : number , y : number , opt_fillRule ? : string ) : boolean ;
    isPointInStroke (x : number , y : number ) : boolean ;
    lineCap : string ;
    lineDashOffset : number ;
    lineJoin : string ;
    lineTo (x : number , y : number ) : void ;
    lineWidth : number ;
    measureText (text : string ) : TextMetrics ;
    miterLimit : number ;
    moveTo (x : number , y : number ) : void ;
    putImageData (imagedata : ImageData , dx : number , dy : number , opt_dirtyX ? : number , opt_dirtyY ? : number , opt_dirtyWidth ? : number , opt_dirtyHeight ? : number ) : void ;
    quadraticCurveTo (cpx : number , cpy : number , x : number , y : number ) : void ;
    rect (x : number , y : number , w : number , h : number ) : void ;
    restore ( ) : void ;
    rotate (angle : number ) : void ;
    save ( ) : void ;
    scale (x : number , y : number ) : void ;
    /**
     * Note: WebKit only
     */
    setFillColor (a ? : number | string , b ? : number , c ? : number , d ? : number , e ? : number ) : void ;
    setLineDash (a : number [] ) : void ;
    /**
     * Note: WebKit only
     */
    setStrokeColor (a ? : number | string , b ? : number , c ? : number , d ? : number , e ? : number ) : void ;
    setTransform (m11 : number , m12 : number , m21 : number , m22 : number , dx : number , dy : number ) : void ;
    shadowBlur : number ;
    shadowColor : string ;
    shadowOffsetX : number ;
    shadowOffsetY : number ;
    stroke ( ) : void ;
    strokeColor : string ;
    strokeRect (x : number , y : number , w : number , h : number ) : void ;
    strokeStyle : string ;
    strokeText (text : string , x : number , y : number , opt_maxWidth ? : number ) : void ;
    textAlign : string ;
    textBaseline : string ;
    transform (m11 : number , m12 : number , m21 : number , m22 : number , dx : number , dy : number ) : void ;
    translate (x : number , y : number ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CanvasGradient extends CanvasGradient_Instance {
  }
  class CanvasGradient_Instance {
    private noStructuralTyping_: any;
    addColorStop (offset : number , color : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CanvasPattern extends CanvasPattern_Instance {
  }
  class CanvasPattern_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextMetrics extends TextMetrics_Instance {
  }
  class TextMetrics_Instance {
    private noStructuralTyping_: any;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ImageData extends ImageData_Instance {
  }
  class ImageData_Instance {
    private noStructuralTyping_: any;
    constructor (dataOrWidth : Uint8ClampedArray | number , widthOrHeight : number , opt_height ? : number ) ;
    data : Uint8ClampedArray ;
    height : number ;
    width : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ClientInformation extends ClientInformation_Instance {
  }
  class ClientInformation_Instance {
    private noStructuralTyping_: any;
    onLine : boolean ;
    registerContentHandler (mimeType : string , uri : string , title : string ) : void ;
    registerProtocolHandler (protocol : string , uri : string , title : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Database extends Database_Instance {
  }
  class Database_Instance {
    private noStructuralTyping_: any;
    changeVersion (oldVersion : string , newVersion : string , callback : (a : SQLTransaction ) => void , errorCallback : (a : SQLError ) => void , successCallback : ( ...a : any [] ) => any ) : any ;
    readTransaction (callback : (a : SQLTransaction ) => void , opt_errorCallback ? : (a : SQLError ) => void , opt_Callback ? : ( ...a : any [] ) => any ) : any ;
    transaction (callback : (a : SQLTransaction ) => void , opt_errorCallback ? : (a : SQLError ) => void , opt_Callback ? : ( ...a : any [] ) => any ) : any ;
    version : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface DatabaseCallback {
    handleEvent (db : Database ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SQLError extends SQLError_Instance {
  }
  class SQLError_Instance {
    private noStructuralTyping_: any;
    code : number ;
    message : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SQLTransaction extends SQLTransaction_Instance {
  }
  class SQLTransaction_Instance {
    private noStructuralTyping_: any;
    executeSql (sqlStatement : string , opt_queryArgs ? : any [] , opt_callback ? : (a : SQLTransaction , b : SQLResultSet ) => void , opt_errorCallback ? : (a : SQLTransaction , b : SQLError ) => boolean ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SQLResultSet extends SQLResultSet_Instance {
  }
  class SQLResultSet_Instance {
    private noStructuralTyping_: any;
    insertId : number ;
    rows : SQLResultSetRowList ;
    rowsAffected : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SQLResultSetRowList extends SQLResultSetRowList_Instance {
  }
  class SQLResultSetRowList_Instance {
    private noStructuralTyping_: any;
    item (index : number ) : Object ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMApplicationCache extends DOMApplicationCache_Instance {
  }
  class DOMApplicationCache_Instance implements EventTarget {
    private noStructuralTyping_: any;
    /**
     * The update has started but the resources are not downloaded yet - for
     * example, this can happen when the manifest file is fetched.
     */
    CHECKING : number ;
    /**
     * The resources are being downloaded into the cache.
     */
    DOWNLOADING : number ;
    /**
     * The cache is idle.
     */
    IDLE : number ;
    /**
     * The cache is obsolete.
     */
    OBSOLETE : number ;
    /**
     * The object isn't associated with an application cache. This can occur if the
     * update process fails and there is no previous cache to revert to, or if there
     * is no manifest file.
     */
    UNCACHED : number ;
    /**
     * Resources have finished downloading and the new cache is ready to be used.
     */
    UPDATEREADY : number ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * Sent when the update process finishes for the first time; that is, the first
     * time an application cache is saved.
     */
    oncached : (a : Event ) => any ;
    /**
     * Sent when the cache update process begins.
     */
    onchecking : (a : Event ) => any ;
    /**
     * Sent when the update process begins downloading resources in the manifest
     * file.
     */
    ondownloading : (a : Event ) => any ;
    /**
     * Sent when an error occurs.
     */
    onerror : (a : Event ) => any ;
    /**
     * Sent when the update process finishes but the manifest file does not change.
     */
    onnoupdate : (a : Event ) => any ;
    /**
     * Sent when each resource in the manifest file begins to download.
     */
    onprogress : (a : Event ) => any ;
    /**
     * Sent when there is an existing application cache, the update process
     * finishes, and there is a new application cache ready for use.
     */
    onupdateready : (a : Event ) => any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * The current status of the application cache.
     */
    status : number ;
    /**
     * Replaces the active cache with the latest version.
     */
    swapCache ( ) : any ;
    /**
     * Manually triggers the update process.
     */
    update ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebWorker extends WebWorker_Instance {
  }
  class WebWorker_Instance implements EventTarget {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * Sent when the worker thread encounters an error.
     * TODO(tbreisacher): Should this change to function(!ErrorEvent)?
     */
    onerror : (a : Event ) => any ;
    /**
     * Sent when the worker thread posts a message to its creator.
     */
    onmessage : (a : MessageEvent < any > ) => any ;
    /**
     * Posts a message to the worker thread.
     */
    postMessage (message : string ) : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Stops the worker process
     */
    terminate ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Worker extends Worker_Instance {
  }
  class Worker_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (opt_arg0 : any ) ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * Sent when the worker thread encounters an error.
     * TODO(tbreisacher): Should this change to function(!ErrorEvent)?
     */
    onerror : (a : Event ) => any ;
    /**
     * Sent when the worker thread posts a message to its creator.
     */
    onmessage : (a : MessageEvent < any > ) => any ;
    /**
     * Posts a message to the worker thread.
     */
    postMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Stops the worker process
     */
    terminate ( ) : any ;
    /**
     * Posts a message to the worker thread.
     */
    webkitPostMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SharedWorker extends SharedWorker_Instance {
  }
  class SharedWorker_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (scriptURL : string , opt_name ? : string ) ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * Called on network errors for loading the initial script.
     * TODO(tbreisacher): Should this change to function(!ErrorEvent)?
     */
    onerror : (a : Event ) => any ;
    port : MessagePort ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WorkerLocation {
    hash : string ;
    host : string ;
    hostname : string ;
    href : string ;
    origin : string ;
    pathname : string ;
    port : string ;
    protocol : string ;
    search : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WorkerGlobalScope extends EventTarget {
    /**
     * Closes the worker represented by this WorkerGlobalScope.
     */
    close : ( ) => any ;
    fetch (input : Request | string , opt_init ? : { body ? : Blob | FormData | string , cache ? : RequestCache , credentials ? : RequestCredentials , headers ? : Headers | string [] [] , method ? : string , mode ? : RequestMode } ) : Promise < Response > ;
    location : WorkerLocation ;
    /**
     * Sent when the worker encounters an error.
     */
    onerror : (a : Event ) => any ;
    /**
     * Sent when the worker goes offline.
     */
    onoffline : (a : Event ) => any ;
    /**
     * Sent when the worker goes online.
     */
    ononline : (a : Event ) => any ;
    self : WorkerGlobalScope ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface DedicatedWorkerGlobalScope extends WorkerGlobalScope {
    /**
     * Sent when the creator posts a message to this worker.
     */
    onmessage : (a : MessageEvent < any > ) => any ;
    /**
     * Posts a message to creator of this worker.
     */
    postMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
    /**
     * Posts a message to creator of this worker.
     */
    webkitPostMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface SharedWorkerGlobalScope extends WorkerGlobalScope {
    name : string ;
    /**
     * Sent when a connection to this worker is opened.
     */
    onconnect : (a : Event ) => any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLMediaElement extends HTMLMediaElement_Instance {
    static HAVE_CURRENT_DATA : number ;
    static HAVE_ENOUGH_DATA : number ;
    static HAVE_FUTURE_DATA : number ;
    static HAVE_METADATA : number ;
    static HAVE_NOTHING : number ;
  }
  class HTMLMediaElement_Instance extends HTMLElement_Instance {
    addTextTrack (kind : string , opt_label ? : string , opt_language ? : string ) : TextTrack ;
    autobuffer : boolean ;
    autoplay : boolean ;
    buffered : TimeRanges ;
    canPlayType (type : string ) : string ;
    controls : boolean ;
    currentSrc : string ;
    /**
     * The current time, in seconds.
     */
    currentTime : number ;
    defaultPlaybackRate : number ;
    /**
     * The length of the media in seconds.
     */
    duration : number ;
    ended : boolean ;
    error : MediaError ;
    /**
     * The absolute timeline offset.
     */
    getStartDate ( ) : Date ;
    /**
     * Loads the media element.
     */
    load : ( ) => any ;
    loop : boolean ;
    muted : boolean ;
    networkState : number ;
    onabort : (a : Event ) => any ;
    oncanplay : (a : Event ) => any ;
    oncanplaythrough : (a : Event ) => any ;
    ondurationchange : (a : Event ) => any ;
    onemptied : (a : Event ) => any ;
    onended : (a : Event ) => any ;
    onerror : (a : Event ) => any ;
    onloadeddata : (a : Event ) => any ;
    onloadedmetadata : (a : Event ) => any ;
    onloadstart : (a : Event ) => any ;
    onpause : (a : Event ) => any ;
    onplay : (a : Event ) => any ;
    onplaying : (a : Event ) => any ;
    onprogress : (a : Event ) => any ;
    onratechange : (a : Event ) => any ;
    onseeked : (a : Event ) => any ;
    onseeking : (a : Event ) => any ;
    onstalled : (a : Event ) => any ;
    onsuspend : (a : Event ) => any ;
    ontimeupdate : (a : Event ) => any ;
    onvolumechange : (a : Event ) => any ;
    onwaiting : (a : Event ) => any ;
    /**
     * Pauses the media.
     */
    pause ( ) : any ;
    paused : boolean ;
    /**
     * Starts playing the media.
     */
    play ( ) : any ;
    playbackRate : number ;
    played : TimeRanges ;
    readyState : number ;
    seekable : TimeRanges ;
    seeking : boolean ;
    src : string ;
    textTracks : TextTrackList ;
    /**
     * The audio volume, from 0.0 (silent) to 1.0 (loudest).
     */
    volume : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextTrackList extends TextTrackList_Instance {
  }
  class TextTrackList_Instance {
    private noStructuralTyping_: any;
    getTrackById (id : string ) : TextTrack ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextTrack extends TextTrack_Instance {
  }
  class TextTrack_Instance implements EventTarget {
    private noStructuralTyping_: any;
    activeCues : TextTrackCueList ;
    addCue (cue : TextTrackCue ) : any ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , useCapture : boolean ) : void ;
    cues : TextTrackCueList ;
    dispatchEvent (evt : Event ) : boolean ;
    removeCue (cue : TextTrackCue ) : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , useCapture : boolean ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextTrackCueList extends TextTrackCueList_Instance {
  }
  class TextTrackCueList_Instance {
    private noStructuralTyping_: any;
    getCueById (id : string ) : TextTrackCue ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextTrackCue extends TextTrackCue_Instance {
  }
  class TextTrackCue_Instance {
    private noStructuralTyping_: any;
    constructor (startTime : number , endTime : number , text : string ) ;
    endTime : number ;
    id : string ;
    startTime : number ;
    text : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class VTTCue extends VTTCue_Instance {
  }
  class VTTCue_Instance extends TextTrackCue_Instance {
    constructor (startTime : any , endTime : any , text : any ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLAudioElement extends HTMLAudioElement_Instance {
  }
  class HTMLAudioElement_Instance extends HTMLMediaElement_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLVideoElement extends HTMLVideoElement_Instance {
  }
  class HTMLVideoElement_Instance extends HTMLMediaElement_Instance {
    getVideoPlaybackQuality ( ) : { corruptedVideoFrames : number , creationTime : number , droppedVideoFrames : number , totalFrameDelay : number , totalVideoFrames : number } ;
    height : string ;
    poster : string ;
    videoHeight : number ;
    videoWidth : number ;
    webkitDecodedFrameCount : number ;
    webkitDisplayingFullscreen : boolean ;
    webkitDroppedFrameCount : number ;
    /**
     * Starts displaying the video in full screen mode.
     */
    webkitEnterFullScreen ( ) : any ;
    /**
     * Starts displaying the video in full screen mode.
     */
    webkitEnterFullscreen ( ) : any ;
    /**
     * Stops displaying the video in full screen mode.
     */
    webkitExitFullScreen ( ) : any ;
    /**
     * Stops displaying the video in full screen mode.
     */
    webkitExitFullscreen ( ) : any ;
    webkitSupportsFullscreen : boolean ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaError extends MediaError_Instance {
  }
  class MediaError_Instance {
    private noStructuralTyping_: any;
    code : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessageChannel extends MessageChannel_Instance {
  }
  class MessageChannel_Instance {
    private noStructuralTyping_: any;
    /**
     * Returns the first port.
     */
    port1 : MessagePort ;
    /**
     * Returns the second port.
     */
    port2 : MessagePort ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessagePort extends MessagePort_Instance {
  }
  class MessagePort_Instance implements EventTarget , Transferable {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Disconnects the port, so that it is no longer active.
     */
    close : ( ) => any ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * TODO(blickly): Change this to MessageEvent<*> and add casts as needed
     */
    onmessage : (a : MessageEvent < any > ) => any ;
    /**
     * Posts a message through the channel, optionally with the given
     * Array of Transferables.
     */
    postMessage (message : any , opt_transfer ? : Transferable [] ) : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Begins dispatching messages received on the port.
     */
    start ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessageEvent < T > extends MessageEvent_Instance < T > {
  }
  class MessageEvent_Instance < T > extends Event_Instance {
    /**
     * The data payload of the message.
     */
    data : T ;
    /**
     * Initializes the event in a manner analogous to the similarly-named methods in
     * the DOM Events interfaces.
     */
    initMessageEvent : (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , dataArg : T , originArg : string , lastEventIdArg : string , sourceArg : Window , portsArg : ( MessagePort ) [] ) => any ;
    /**
     * Initializes the event in a manner analogous to the similarly-named methods in
     * the DOM Events interfaces.
     */
    initMessageEventNS (namespaceURI : string , typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , dataArg : T , originArg : string , lastEventIdArg : string , sourceArg : Window , portsArg : ( MessagePort ) [] ) : any ;
    /**
     * The last event ID, for server-sent events.
     */
    lastEventId : string ;
    /**
     * The origin of the message, for server-sent events and cross-document
     * messaging.
     */
    origin : string ;
    /**
     * The Array of MessagePorts sent with the message, for cross-document
     * messaging and channel messaging.
     */
    ports : ( MessagePort ) [] ;
    /**
     * The window that dispatched the event.
     */
    source : Window ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * HTML5 DataTransfer class.
   *
   * We say that this extends ClipboardData, because Event.prototype.clipboardData
   * is a DataTransfer on WebKit but a ClipboardData on IE. The interfaces are so
   * similar that it's easier to merge them.
   */
  class DataTransfer extends DataTransfer_Instance {
  }
  class DataTransfer_Instance extends ClipboardData_Instance {
    addElement (elem : HTMLElement ) : any ;
    clearData (opt_format ? : string ) : any ;
    dropEffect : string ;
    effectAllowed : string ;
    files : FileList ;
    getData (format : string ) : string ;
    items : DataTransferItemList ;
    setData (format : string , data : string ) : boolean ;
    setDragImage (img : HTMLElement , x : number , y : number ) : any ;
    types : string [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WheelEvent extends WheelEvent_Instance {
  }
  class WheelEvent_Instance extends MouseEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { altKey ? : boolean , bubbles ? : boolean , button ? : number , buttons ? : number , cancelable ? : boolean , clientX ? : number , clientY ? : number , ctrlKey ? : boolean , deltaMode ? : number , deltaX ? : number , deltaY ? : number , deltaZ ? : number , detail ? : number , metaKey ? : boolean , relatedTarget ? : EventTarget , screenX ? : number , screenY ? : number , shiftKey ? : boolean , view ? : Window } ) ;
    deltaMode : number ;
    deltaX : number ;
    deltaY : number ;
    deltaZ : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * HTML5 DataTransferItem class.
   */
  class DataTransferItem extends DataTransferItem_Instance {
  }
  class DataTransferItem_Instance {
    private noStructuralTyping_: any;
    getAsFile ( ) : File ;
    getAsString (callback : (a : string ) => any ) : any ;
    kind : string ;
    type : string ;
    webkitGetAsEntry ( ) : Entry ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * HTML5 DataTransferItemList class. There are some discrepancies in the docs
   * on the whatwg.org site. When in doubt, these prototypes match what is
   * implemented as of Chrome 30.
   */
  class DataTransferItemList extends DataTransferItemList_Instance {
  }
  class DataTransferItemList_Instance {
    private noStructuralTyping_: any;
    /**
     * Adds an item to the list.
     * @param data Data for the item being added.
     * @param opt_type Mime type of the item being added. MUST be present if the {@code data} parameter is a string.
     */
    add (data : string | File , opt_type ? : string ) : any ;
    /**
     * Removes all items from the list.
     */
    clear ( ) : any ;
    item (i : number ) : DataTransferItem ;
    length : number ;
    /**
     * Removes an item from the list.
     * @param i File to remove from the list.
     */
    remove (i : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DragEvent extends DragEvent_Instance {
  }
  class DragEvent_Instance extends MouseEvent_Instance {
    dataTransfer : DataTransfer ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ProgressEvent extends ProgressEvent_Instance {
  }
  class ProgressEvent_Instance extends Event_Instance {
    constructor (type : string , opt_progressEventInitDict ? : { lengthComputable ? : boolean , loaded ? : number , total ? : number } ) ;
    lengthComputable : boolean ;
    loaded : number ;
    total : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TimeRanges extends TimeRanges_Instance {
  }
  class TimeRanges_Instance {
    private noStructuralTyping_: any;
    end (index : number ) : number ;
    length : number ;
    start (index : number ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebSocket extends WebSocket_Instance {
    /**
     * The connection has been closed or could not be opened.
     */
    static CLOSED : number ;
    /**
     * The connection is going through the closing handshake, or the close() method has been invoked.
     */
    static CLOSING : number ;
    /**
     * The connection has not yet been established.
     */
    static CONNECTING : number ;
    /**
     * The WebSocket connection is established and communication is possible.
     */
    static OPEN : number ;
  }
  class WebSocket_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (url : string , opt_protocol ? : string ) ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    binaryType : string ;
    /**
     * Returns the number of bytes that have been queued but not yet sent.
     */
    bufferedAmount : number ;
    /**
     * Closes the Web Socket connection or connection attempt, if any.
     */
    close : (opt_code ? : number , opt_reason ? : string ) => any ;
    dispatchEvent (evt : Event ) : boolean ;
    /**
     * An event handler called on close event.
     */
    onclose : (a : Event ) => any ;
    /**
     * An event handler called on message event.
     * TODO(blickly): Change this to MessageEvent<*> and add casts as needed
     */
    onmessage : (a : MessageEvent < any > ) => any ;
    /**
     * An event handler called on open event.
     */
    onopen : (a : Event ) => any ;
    /**
     * Represents the state of the connection.
     */
    readyState : number ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Transmits data using the connection.
     */
    send (data : string | ArrayBuffer | ArrayBufferView ) : boolean ;
    /**
     * Returns the URL value that was passed to the constructor.
     */
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PopStateEvent extends PopStateEvent_Instance {
  }
  class PopStateEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { state : any } ) ;
    /**
     * Initializes the event after it has been created with document.createEvent
     */
    initPopStateEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , stateArg : any ) : any ;
    state : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HashChangeEvent extends HashChangeEvent_Instance {
  }
  class HashChangeEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { newURL : string , oldURL : string } ) ;
    /**
     * Initializes the event after it has been created with document.createEvent
     */
    initHashChangeEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , oldURLArg : string , newURLArg : string ) : any ;
    newURL : string ;
    oldURL : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PageTransitionEvent extends PageTransitionEvent_Instance {
  }
  class PageTransitionEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { persisted : boolean } ) ;
    /**
     * Initializes the event after it has been created with document.createEvent
     */
    initPageTransitionEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , persistedArg : any ) : any ;
    persisted : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileList extends FileList_Instance {
  }
  class FileList_Instance {
    private noStructuralTyping_: any;
    item (i : number ) : File ;
    length : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * XMLHttpRequestEventTarget defines events for checking the status of a data
   * transfer between a client and a server. This should be a common base class
   * for XMLHttpRequest and XMLHttpRequestUpload.
   */
  class XMLHttpRequestEventTarget extends XMLHttpRequestEventTarget_Instance {
  }
  class XMLHttpRequestEventTarget_Instance implements EventTarget {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * An event target to track the status of an upload.
   */
  class XMLHttpRequestUpload extends XMLHttpRequestUpload_Instance {
  }
  class XMLHttpRequestUpload_Instance extends XMLHttpRequestEventTarget_Instance {
    onprogress : (a : ProgressEvent ) => void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Image extends Image_Instance {
  }
  class Image_Instance extends HTMLImageElement_Instance {
    constructor (opt_width ? : number , opt_height ? : number ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DOMTokenList extends DOMTokenList_Instance {
  }
  class DOMTokenList_Instance implements IArrayLike < string > {
    private noStructuralTyping_: any;
    add ( ...var_args : ( string ) [] ) : any ;
    contains (token : string ) : boolean ;
    item (index : number ) : string ;
    /**
     * Returns the number of CSS classes applied to this Element.
     */
    length : number ;
    remove ( ...var_args : ( string ) [] ) : any ;
    toString ( ) : string ;
    toggle (token : string , opt_force ? : boolean ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ValidityState extends ValidityState_Instance {
  }
  class ValidityState_Instance {
    private noStructuralTyping_: any;
    customError : boolean ;
    patternMismatch : boolean ;
    rangeOverflow : boolean ;
    rangeUnderflow : boolean ;
    stepMismatch : boolean ;
    tooLong : boolean ;
    typeMismatch : boolean ;
    valid : boolean ;
    valueMissing : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLEmbedElement extends HTMLEmbedElement_Instance {
  }
  class HTMLEmbedElement_Instance extends HTMLElement_Instance {
    height : string ;
    postMessage (message : string | Object ) : any ;
    src : string ;
    type : string ;
    width : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MutationRecord extends MutationRecord_Instance {
  }
  class MutationRecord_Instance {
    private noStructuralTyping_: any;
    addedNodes : NodeList ;
    attributeName : string ;
    attributeNamespace : string ;
    nextSibling : Node ;
    oldValue : string ;
    previouSibling : Node ;
    removedNodes : NodeList ;
    target : Node ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MutationObserver extends MutationObserver_Instance {
  }
  class MutationObserver_Instance {
    private noStructuralTyping_: any;
    constructor (callback : (a : ( MutationRecord ) [] , b : MutationObserver ) => any ) ;
    disconnect ( ) : any ;
    observe (target : Node , options ? : { attributeFilter ? : string [] , attributeOldValue ? : boolean , attributes ? : boolean , characterData ? : boolean , characterDataOldValue ? : boolean , childList ? : boolean , subtree ? : boolean } ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Definition of ShadowRoot interface,
   */
  class ShadowRoot extends ShadowRoot_Instance {
  }
  class ShadowRoot_Instance extends DocumentFragment_Instance {
    activeElement : Element ;
    applyAuthorStyles : boolean ;
    elementFromPoint (x : number , y : number ) : Element ;
    getElementById (id : string ) : HTMLElement ;
    getElementsByClassName (className : string ) : NodeList ;
    getElementsByTagName (tagName : string ) : NodeList ;
    getElementsByTagNameNS (namespace : string , localName : string ) : NodeList ;
    getSelection ( ) : Selection ;
    /**
     * The host element that a ShadowRoot is attached to.
     * Note: this is not yet W3C standard but is undergoing development.
     * W3C feature tracking bug:
     * https://www.w3.org/Bugs/Public/show_bug.cgi?id=22399
     * Draft specification:
     * https://dvcs.w3.org/hg/webcomponents/raw-file/6743f1ace623/spec/shadow/index.html#shadow-root-object
     */
    host : Element ;
    innerHTML : string ;
    olderShadowRoot : ShadowRoot ;
    resetStyleInheritance : boolean ;
    styleSheets : StyleSheetList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLContentElement extends HTMLContentElement_Instance {
  }
  class HTMLContentElement_Instance extends HTMLElement_Instance {
    getDistributedNodes ( ) : NodeList ;
    select : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLShadowElement extends HTMLShadowElement_Instance {
  }
  class HTMLShadowElement_Instance extends HTMLElement_Instance {
    getDistributedNodes ( ) : NodeList ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ErrorEvent extends ErrorEvent_Instance {
  }
  class ErrorEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean , colno : number , error : any , filename : string , lineno : number , message : string } ) ;
    colno : number ;
    error : any ;
    filename : string ;
    lineno : number ;
    message : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLPictureElement extends HTMLPictureElement_Instance {
  }
  class HTMLPictureElement_Instance extends HTMLElement_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLSourceElement extends HTMLSourceElement_Instance {
  }
  class HTMLSourceElement_Instance extends HTMLElement_Instance {
    media : string ;
    sizes : string ;
    src : string ;
    srcset : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDetailsElement extends HTMLDetailsElement_Instance {
  }
  class HTMLDetailsElement_Instance extends HTMLElement_Instance {
    open : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLMenuItemElement extends HTMLMenuItemElement_Instance {
  }
  class HTMLMenuItemElement_Instance extends HTMLElement_Instance {
    checked : boolean ;
    default : boolean ;
    disabled : boolean ;
    icon : string ;
    label : string ;
    radiogroup : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RelatedEvent extends RelatedEvent_Instance {
  }
  class RelatedEvent_Instance extends Event_Instance {
    constructor (type : string , opt_eventInitDict ? : { relatedTarget ? : EventTarget } ) ;
    relatedTarget : EventTarget ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLDialogElement extends HTMLDialogElement_Instance {
  }
  class HTMLDialogElement_Instance extends HTMLElement_Instance {
    close : (opt_returnValue ? : string ) => any ;
    open : boolean ;
    returnValue : string ;
    show (opt_anchor ? : MouseEvent | Element ) : any ;
    showModal (opt_anchor ? : MouseEvent | Element ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class HTMLTemplateElement extends HTMLTemplateElement_Instance {
  }
  class HTMLTemplateElement_Instance extends HTMLElement_Instance {
    content : DocumentFragment ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Port extends Port_Instance {
  }
  class Port_Instance {
    private noStructuralTyping_: any;
    disconnect ( ) : void ;
    name : string ;
    onDisconnect : ChromeEvent ;
    onMessage : ChromeEvent ;
    postMessage (obj : any ) : void ;
    sender : MessageSender ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ChromeEvent extends ChromeEvent_Instance {
  }
  class ChromeEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : ( ...a : any [] ) => any ) : void ;
    hasListener (callback : ( ...a : any [] ) => any ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : ( ...a : any [] ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take a string parameter.
   */
  class ChromeStringEvent extends ChromeStringEvent_Instance {
  }
  class ChromeStringEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : string ) => void ) : any ;
    hasListener (callback : (a : string ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take a boolean parameter.
   */
  class ChromeBooleanEvent extends ChromeBooleanEvent_Instance {
  }
  class ChromeBooleanEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : boolean ) => void ) : any ;
    hasListener (callback : (a : boolean ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : boolean ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take a number parameter.
   */
  class ChromeNumberEvent extends ChromeNumberEvent_Instance {
  }
  class ChromeNumberEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : number ) => void ) : any ;
    hasListener (callback : (a : number ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : number ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take an Object parameter.
   */
  class ChromeObjectEvent extends ChromeObjectEvent_Instance {
  }
  class ChromeObjectEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : Object ) => void ) : any ;
    hasListener (callback : (a : Object ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : Object ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take a string array parameter.
   */
  class ChromeStringArrayEvent extends ChromeStringArrayEvent_Instance {
  }
  class ChromeStringArrayEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : string [] ) => void ) : any ;
    hasListener (callback : (a : string [] ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string [] ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Event whose listeners take two strings as parameters.
   */
  class ChromeStringStringEvent extends ChromeStringStringEvent_Instance {
  }
  class ChromeStringStringEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : string , b : string ) => void ) : any ;
    hasListener (callback : (a : string , b : string ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string , b : string ) => void ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessageSender extends MessageSender_Instance {
  }
  class MessageSender_Instance {
    private noStructuralTyping_: any;
    frameId : number ;
    id : string ;
    tab : Tab ;
    tlsChannelId : string ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Tab extends Tab_Instance {
  }
  class Tab_Instance {
    private noStructuralTyping_: any;
    active : boolean ;
    favIconUrl : string ;
    height : number ;
    highlighted : boolean ;
    id : number ;
    incognito : boolean ;
    index : number ;
    openerTabId : number ;
    pinned : boolean ;
    sessionId : string ;
    status : string ;
    title : string ;
    url : string ;
    width : number ;
    windowId : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The data object given by chrome.loadTimes().
   */
  class ChromeLoadTimes extends ChromeLoadTimes_Instance {
  }
  class ChromeLoadTimes_Instance {
    private noStructuralTyping_: any;
    commitLoadTime : number ;
    connectionInfo : string ;
    finishDocumentLoadTime : number ;
    finishLoadTime : number ;
    firstPaintAfterLoadTime : number ;
    firstPaintTime : number ;
    navigationType : number ;
    npnNegotiatedProtocol : string ;
    requestTime : number ;
    startLoadTime : number ;
    wasAlternateProtocolAvailable : boolean ;
    /**
     * True iff the resource was fetched over SPDY.
     */
    wasFetchedViaSpdy : boolean ;
    wasNpnNegotiated : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The data object given by chrome.csi().
   */
  class ChromeCsiInfo extends ChromeCsiInfo_Instance {
  }
  class ChromeCsiInfo_Instance {
    private noStructuralTyping_: any;
    /**
     * Same as chrome.loadTimes().finishDocumentLoadTime but in milliseconds and
     * truncated.
     */
    onloadT : number ;
    /**
     * The time since startE in milliseconds.
     */
    pageT : number ;
    /**
     * Same as chrome.loadTimes().requestTime, if defined.
     * Otherwise, gives the same value as chrome.loadTimes().startLoadTime.
     * In milliseconds, truncated.
     */
    startE : number ;
    tran : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XSLTProcessor extends XSLTProcessor_Instance {
  }
  class XSLTProcessor_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Option extends Option_Instance {
  }
  class Option_Instance extends Element_Instance {
    constructor (opt_text ? : any , opt_value ? : any , opt_defaultSelected ? : any , opt_selected ? : any ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBFactory extends IDBFactory_Instance {
  }
  class IDBFactory_Instance {
    private noStructuralTyping_: any;
    deleteDatabase (name : string ) : IDBOpenDBRequest ;
    open : (name : string , opt_version ? : number ) => IDBOpenDBRequest ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBDatabaseException extends IDBDatabaseException_Instance {
    static ABORT_ERR : number ;
    static CONSTRAINT_ERR : number ;
    static DATA_ERR : number ;
    static NON_TRANSIENT_ERR : number ;
    static NOT_ALLOWED_ERR : number ;
    static NOT_FOUND_ERR : number ;
    static QUOTA_ERR : number ;
    static READ_ONLY_ERR : number ;
    static TIMEOUT_ERR : number ;
    static TRANSACTION_INACTIVE_ERR : number ;
    static UNKNOWN_ERR : number ;
  }
  class IDBDatabaseException_Instance {
    private noStructuralTyping_: any;
    code : number ;
    message : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBDatabaseException extends webkitIDBDatabaseException_Instance {
    static ABORT_ERR : number ;
    static CONSTRAINT_ERR : number ;
    static DATA_ERR : number ;
    static NON_TRANSIENT_ERR : number ;
    static NOT_ALLOWED_ERR : number ;
    static NOT_FOUND_ERR : number ;
    static QUOTA_ERR : number ;
    static READ_ONLY_ERR : number ;
    static TIMEOUT_ERR : number ;
    static TRANSACTION_INACTIVE_ERR : number ;
    static UNKNOWN_ERR : number ;
  }
  class webkitIDBDatabaseException_Instance extends IDBDatabaseException_Instance {
    code : number ;
    message : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBRequest extends IDBRequest_Instance {
    static DONE : number ;
    static LOADING : number ;
  }
  class IDBRequest_Instance implements EventTarget {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    error : DOMError ;
    errorCode : number ;
    onerror (a : Event ) : any ;
    onsuccess (a : Event ) : any ;
    readyState : number ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    result : any ;
    source : Object ;
    transaction : IDBTransaction ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBRequest extends webkitIDBRequest_Instance {
    static DONE : number ;
    static LOADING : number ;
  }
  class webkitIDBRequest_Instance extends IDBRequest_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBOpenDBRequest extends IDBOpenDBRequest_Instance {
  }
  class IDBOpenDBRequest_Instance extends IDBRequest_Instance {
    onblocked (a : IDBVersionChangeEvent ) : any ;
    onupgradeneeded (a : IDBVersionChangeEvent ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBDatabase extends IDBDatabase_Instance {
  }
  class IDBDatabase_Instance implements EventTarget {
    private noStructuralTyping_: any;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * Closes the database connection.
     */
    close : ( ) => any ;
    createObjectStore (name : string , opt_parameters ? : Object ) : IDBObjectStore ;
    deleteObjectStore (name : string ) : any ;
    description : string ;
    dispatchEvent (evt : Event ) : boolean ;
    name : string ;
    objectStoreNames : DOMStringList ;
    onabort : ( ...a : any [] ) => any ;
    onerror : ( ...a : any [] ) => any ;
    onversionchange : ( ...a : any [] ) => any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    setVersion (version : string ) : IDBRequest ;
    transaction (storeNames : string [] , mode ? : number | string ) : IDBTransaction ;
    version : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBObjectStore extends IDBObjectStore_Instance {
  }
  class IDBObjectStore_Instance {
    private noStructuralTyping_: any;
    add (value : any , key ? : number | string | Date | any [] ) : IDBRequest ;
    autoIncrement : boolean ;
    clear ( ) : IDBRequest ;
    count (key ? : number | string | Date | any [] | IDBKeyRange ) : IDBRequest ;
    createIndex (name : string , keyPath : string | string [] , opt_paramters ? : Object ) : IDBIndex ;
    delete (key : number | string | Date | any [] ) : IDBRequest ;
    deleteIndex (indexName : string ) : any ;
    get (key : number | string | Date | any [] | IDBKeyRange ) : IDBRequest ;
    index (name : string ) : IDBIndex ;
    indexNames : DOMStringList ;
    keyPath : string ;
    name : string ;
    openCursor (range ? : IDBKeyRange , direction ? : number | string ) : IDBRequest ;
    put (value : any , key ? : number | string | Date | any [] ) : IDBRequest ;
    transaction : IDBTransaction ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBIndex extends IDBIndex_Instance {
  }
  class IDBIndex_Instance {
    private noStructuralTyping_: any;
    get (key : number | string | Date | any [] | IDBKeyRange ) : IDBRequest ;
    getKey (key : number | string | Date | any [] | IDBKeyRange ) : IDBRequest ;
    keyPath : string ;
    name : string ;
    objectStore : IDBObjectStore ;
    openCursor (range ? : IDBKeyRange , direction ? : number | string ) : IDBRequest ;
    openKeyCursor (range ? : IDBKeyRange , direction ? : number | string ) : IDBRequest ;
    unique : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBCursor extends IDBCursor_Instance {
    static NEXT : number ;
    static NEXT_NO_DUPLICATE : number ;
    static PREV : number ;
    static PREV_NO_DUPLICATE : number ;
  }
  class IDBCursor_Instance {
    private noStructuralTyping_: any;
    advance (count : number ) : any ;
    /**
     * Note: Must be quoted to avoid parse error.
     * @param key Continue enumerating the cursor from the specified key (or next).
     */
    continue (key ? : number | string | Date | any [] ) : any ;
    /**
     * Note: Must be quoted to avoid parse error.
     */
    delete ( ) : IDBRequest ;
    direction : number ;
    key : number | string | Date | any [] ;
    primaryKey : number ;
    source : any ;
    update (value : any ) : IDBRequest ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBCursor extends webkitIDBCursor_Instance {
    static NEXT : number ;
    static NEXT_NO_DUPLICATE : number ;
    static PREV : number ;
    static PREV_NO_DUPLICATE : number ;
  }
  class webkitIDBCursor_Instance extends IDBCursor_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBCursorWithValue extends IDBCursorWithValue_Instance {
  }
  class IDBCursorWithValue_Instance extends IDBCursor_Instance {
    value : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBTransaction extends IDBTransaction_Instance {
    static READ_ONLY : number ;
    static READ_WRITE : number ;
    static VERSION_CHANGE : number ;
  }
  class IDBTransaction_Instance {
    private noStructuralTyping_: any;
    /**
     * Aborts the transaction.
     */
    abort ( ) : any ;
    db : IDBDatabase ;
    mode : number | string ;
    objectStore (name : string ) : IDBObjectStore ;
    onabort : ( ...a : any [] ) => any ;
    oncomplete : ( ...a : any [] ) => any ;
    onerror : ( ...a : any [] ) => any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBTransaction extends webkitIDBTransaction_Instance {
    static READ_ONLY : number ;
    static READ_WRITE : number ;
    static VERSION_CHANGE : number ;
  }
  class webkitIDBTransaction_Instance extends IDBTransaction_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBKeyRange extends IDBKeyRange_Instance {
    static bound (left : number | string | Date | any [] , right : number | string | Date | any [] , openLeft ? : boolean , openRight ? : boolean ) : IDBKeyRange ;
    static lowerBound (bound : number | string | Date | any [] , open ? : boolean ) : IDBKeyRange ;
    static only (value : number | string | Date | any [] ) : IDBKeyRange ;
    static upperBound (bound : number | string | Date | any [] , open ? : boolean ) : IDBKeyRange ;
  }
  class IDBKeyRange_Instance {
    private noStructuralTyping_: any;
    lower : any ;
    lowerOpen : any ;
    upper : any ;
    upperOpen : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBKeyRange extends webkitIDBKeyRange_Instance {
    static bound (left : number | string | Date | any [] , right : number | string | Date | any [] , openLeft ? : boolean , openRight ? : boolean ) : IDBKeyRange ;
    static lowerBound (bound : number | string | Date | any [] , open ? : boolean ) : IDBKeyRange ;
    static only (value : number | string | Date | any [] ) : IDBKeyRange ;
    static upperBound (bound : number | string | Date | any [] , open ? : boolean ) : IDBKeyRange ;
  }
  class webkitIDBKeyRange_Instance extends IDBKeyRange_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class IDBVersionChangeEvent extends IDBVersionChangeEvent_Instance {
  }
  class IDBVersionChangeEvent_Instance extends Event_Instance {
    newVersion : number ;
    oldVersion : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitIDBVersionChangeEvent extends webkitIDBVersionChangeEvent_Instance {
  }
  class webkitIDBVersionChangeEvent_Instance extends IDBVersionChangeEvent_Instance {
    version : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLRenderingContext extends WebGLRenderingContext_Instance {
    static ACTIVE_ATTRIBUTES : number ;
    static ACTIVE_TEXTURE : number ;
    static ACTIVE_UNIFORMS : number ;
    static ALIASED_LINE_WIDTH_RANGE : number ;
    static ALIASED_POINT_SIZE_RANGE : number ;
    static ALPHA : number ;
    static ALPHA_BITS : number ;
    static ALWAYS : number ;
    static ARRAY_BUFFER : number ;
    static ARRAY_BUFFER_BINDING : number ;
    static ATTACHED_SHADERS : number ;
    static BACK : number ;
    static BLEND : number ;
    static BLEND_COLOR : number ;
    static BLEND_DST_ALPHA : number ;
    static BLEND_DST_RGB : number ;
    static BLEND_EQUATION : number ;
    static BLEND_EQUATION_ALPHA : number ;
    static BLEND_EQUATION_RGB : number ;
    static BLEND_SRC_ALPHA : number ;
    static BLEND_SRC_RGB : number ;
    static BLUE_BITS : number ;
    static BOOL : number ;
    static BOOL_VEC2 : number ;
    static BOOL_VEC3 : number ;
    static BOOL_VEC4 : number ;
    static BROWSER_DEFAULT_WEBGL : number ;
    static BUFFER_SIZE : number ;
    static BUFFER_USAGE : number ;
    static BYTE : number ;
    static CCW : number ;
    static CLAMP_TO_EDGE : number ;
    static COLOR_ATTACHMENT0 : number ;
    static COLOR_BUFFER_BIT : number ;
    static COLOR_CLEAR_VALUE : number ;
    static COLOR_WRITEMASK : number ;
    static COMPILE_STATUS : number ;
    static COMPRESSED_TEXTURE_FORMATS : number ;
    static CONSTANT_ALPHA : number ;
    static CONSTANT_COLOR : number ;
    static CONTEXT_LOST_WEBGL : number ;
    static CULL_FACE : number ;
    static CULL_FACE_MODE : number ;
    static CURRENT_PROGRAM : number ;
    static CURRENT_VERTEX_ATTRIB : number ;
    static CW : number ;
    static DECR : number ;
    static DECR_WRAP : number ;
    static DELETE_STATUS : number ;
    static DEPTH_ATTACHMENT : number ;
    static DEPTH_BITS : number ;
    static DEPTH_BUFFER_BIT : number ;
    static DEPTH_CLEAR_VALUE : number ;
    static DEPTH_COMPONENT : number ;
    static DEPTH_COMPONENT16 : number ;
    static DEPTH_FUNC : number ;
    static DEPTH_RANGE : number ;
    static DEPTH_STENCIL : number ;
    static DEPTH_STENCIL_ATTACHMENT : number ;
    static DEPTH_TEST : number ;
    static DEPTH_WRITEMASK : number ;
    static DITHER : number ;
    static DONT_CARE : number ;
    static DST_ALPHA : number ;
    static DST_COLOR : number ;
    static DYNAMIC_DRAW : number ;
    static ELEMENT_ARRAY_BUFFER : number ;
    static ELEMENT_ARRAY_BUFFER_BINDING : number ;
    static EQUAL : number ;
    static FASTEST : number ;
    static FLOAT : number ;
    static FLOAT_MAT2 : number ;
    static FLOAT_MAT3 : number ;
    static FLOAT_MAT4 : number ;
    static FLOAT_VEC2 : number ;
    static FLOAT_VEC3 : number ;
    static FLOAT_VEC4 : number ;
    static FRAGMENT_SHADER : number ;
    static FRAMEBUFFER : number ;
    static FRAMEBUFFER_ATTACHMENT_OBJECT_NAME : number ;
    static FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE : number ;
    static FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE : number ;
    static FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL : number ;
    static FRAMEBUFFER_BINDING : number ;
    static FRAMEBUFFER_COMPLETE : number ;
    static FRAMEBUFFER_INCOMPLETE_ATTACHMENT : number ;
    static FRAMEBUFFER_INCOMPLETE_DIMENSIONS : number ;
    static FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT : number ;
    static FRAMEBUFFER_UNSUPPORTED : number ;
    static FRONT : number ;
    static FRONT_AND_BACK : number ;
    static FRONT_FACE : number ;
    static FUNC_ADD : number ;
    static FUNC_REVERSE_SUBTRACT : number ;
    static FUNC_SUBTRACT : number ;
    static GENERATE_MIPMAP_HINT : number ;
    static GEQUAL : number ;
    static GREATER : number ;
    static GREEN_BITS : number ;
    static HIGH_FLOAT : number ;
    static HIGH_INT : number ;
    static INCR : number ;
    static INCR_WRAP : number ;
    static INT : number ;
    static INT_VEC2 : number ;
    static INT_VEC3 : number ;
    static INT_VEC4 : number ;
    static INVALID_ENUM : number ;
    static INVALID_FRAMEBUFFER_OPERATION : number ;
    static INVALID_OPERATION : number ;
    static INVALID_VALUE : number ;
    static INVERT : number ;
    static KEEP : number ;
    static LEQUAL : number ;
    static LESS : number ;
    static LINEAR : number ;
    static LINEAR_MIPMAP_LINEAR : number ;
    static LINEAR_MIPMAP_NEAREST : number ;
    static LINES : number ;
    static LINE_LOOP : number ;
    static LINE_STRIP : number ;
    static LINE_WIDTH : number ;
    static LINK_STATUS : number ;
    static LOW_FLOAT : number ;
    static LOW_INT : number ;
    static LUMINANCE : number ;
    static LUMINANCE_ALPHA : number ;
    static MAX_COMBINED_TEXTURE_IMAGE_UNITS : number ;
    static MAX_CUBE_MAP_TEXTURE_SIZE : number ;
    static MAX_FRAGMENT_UNIFORM_VECTORS : number ;
    static MAX_RENDERBUFFER_SIZE : number ;
    static MAX_TEXTURE_IMAGE_UNITS : number ;
    static MAX_TEXTURE_SIZE : number ;
    static MAX_VARYING_VECTORS : number ;
    static MAX_VERTEX_ATTRIBS : number ;
    static MAX_VERTEX_TEXTURE_IMAGE_UNITS : number ;
    static MAX_VERTEX_UNIFORM_VECTORS : number ;
    static MAX_VIEWPORT_DIMS : number ;
    static MEDIUM_FLOAT : number ;
    static MEDIUM_INT : number ;
    static MIRRORED_REPEAT : number ;
    static NEAREST : number ;
    static NEAREST_MIPMAP_LINEAR : number ;
    static NEAREST_MIPMAP_NEAREST : number ;
    static NEVER : number ;
    static NICEST : number ;
    static NONE : number ;
    static NOTEQUAL : number ;
    static NO_ERROR : number ;
    static ONE : number ;
    static ONE_MINUS_CONSTANT_ALPHA : number ;
    static ONE_MINUS_CONSTANT_COLOR : number ;
    static ONE_MINUS_DST_ALPHA : number ;
    static ONE_MINUS_DST_COLOR : number ;
    static ONE_MINUS_SRC_ALPHA : number ;
    static ONE_MINUS_SRC_COLOR : number ;
    static OUT_OF_MEMORY : number ;
    static PACK_ALIGNMENT : number ;
    static POINTS : number ;
    static POLYGON_OFFSET_FACTOR : number ;
    static POLYGON_OFFSET_FILL : number ;
    static POLYGON_OFFSET_UNITS : number ;
    static RED_BITS : number ;
    static RENDERBUFFER : number ;
    static RENDERBUFFER_ALPHA_SIZE : number ;
    static RENDERBUFFER_BINDING : number ;
    static RENDERBUFFER_BLUE_SIZE : number ;
    static RENDERBUFFER_DEPTH_SIZE : number ;
    static RENDERBUFFER_GREEN_SIZE : number ;
    static RENDERBUFFER_HEIGHT : number ;
    static RENDERBUFFER_INTERNAL_FORMAT : number ;
    static RENDERBUFFER_RED_SIZE : number ;
    static RENDERBUFFER_STENCIL_SIZE : number ;
    static RENDERBUFFER_WIDTH : number ;
    static RENDERER : number ;
    static REPEAT : number ;
    static REPLACE : number ;
    static RGB : number ;
    static RGB565 : number ;
    static RGB5_A1 : number ;
    static RGBA : number ;
    static RGBA4 : number ;
    static SAMPLER_2D : number ;
    static SAMPLER_CUBE : number ;
    static SAMPLES : number ;
    static SAMPLE_ALPHA_TO_COVERAGE : number ;
    static SAMPLE_BUFFERS : number ;
    static SAMPLE_COVERAGE : number ;
    static SAMPLE_COVERAGE_INVERT : number ;
    static SAMPLE_COVERAGE_VALUE : number ;
    static SCISSOR_BOX : number ;
    static SCISSOR_TEST : number ;
    static SHADER_TYPE : number ;
    static SHADING_LANGUAGE_VERSION : number ;
    static SHORT : number ;
    static SRC_ALPHA : number ;
    static SRC_ALPHA_SATURATE : number ;
    static SRC_COLOR : number ;
    static STATIC_DRAW : number ;
    static STENCIL_ATTACHMENT : number ;
    static STENCIL_BACK_FAIL : number ;
    static STENCIL_BACK_FUNC : number ;
    static STENCIL_BACK_PASS_DEPTH_FAIL : number ;
    static STENCIL_BACK_PASS_DEPTH_PASS : number ;
    static STENCIL_BACK_REF : number ;
    static STENCIL_BACK_VALUE_MASK : number ;
    static STENCIL_BACK_WRITEMASK : number ;
    static STENCIL_BITS : number ;
    static STENCIL_BUFFER_BIT : number ;
    static STENCIL_CLEAR_VALUE : number ;
    static STENCIL_FAIL : number ;
    static STENCIL_FUNC : number ;
    static STENCIL_INDEX : number ;
    static STENCIL_INDEX8 : number ;
    static STENCIL_PASS_DEPTH_FAIL : number ;
    static STENCIL_PASS_DEPTH_PASS : number ;
    static STENCIL_REF : number ;
    static STENCIL_TEST : number ;
    static STENCIL_VALUE_MASK : number ;
    static STENCIL_WRITEMASK : number ;
    static STREAM_DRAW : number ;
    static SUBPIXEL_BITS : number ;
    static TEXTURE : number ;
    static TEXTURE0 : number ;
    static TEXTURE1 : number ;
    static TEXTURE10 : number ;
    static TEXTURE11 : number ;
    static TEXTURE12 : number ;
    static TEXTURE13 : number ;
    static TEXTURE14 : number ;
    static TEXTURE15 : number ;
    static TEXTURE16 : number ;
    static TEXTURE17 : number ;
    static TEXTURE18 : number ;
    static TEXTURE19 : number ;
    static TEXTURE2 : number ;
    static TEXTURE20 : number ;
    static TEXTURE21 : number ;
    static TEXTURE22 : number ;
    static TEXTURE23 : number ;
    static TEXTURE24 : number ;
    static TEXTURE25 : number ;
    static TEXTURE26 : number ;
    static TEXTURE27 : number ;
    static TEXTURE28 : number ;
    static TEXTURE29 : number ;
    static TEXTURE3 : number ;
    static TEXTURE30 : number ;
    static TEXTURE31 : number ;
    static TEXTURE4 : number ;
    static TEXTURE5 : number ;
    static TEXTURE6 : number ;
    static TEXTURE7 : number ;
    static TEXTURE8 : number ;
    static TEXTURE9 : number ;
    static TEXTURE_2D : number ;
    static TEXTURE_BINDING_2D : number ;
    static TEXTURE_BINDING_CUBE_MAP : number ;
    static TEXTURE_CUBE_MAP : number ;
    static TEXTURE_CUBE_MAP_NEGATIVE_X : number ;
    static TEXTURE_CUBE_MAP_NEGATIVE_Y : number ;
    static TEXTURE_CUBE_MAP_NEGATIVE_Z : number ;
    static TEXTURE_CUBE_MAP_POSITIVE_X : number ;
    static TEXTURE_CUBE_MAP_POSITIVE_Y : number ;
    static TEXTURE_CUBE_MAP_POSITIVE_Z : number ;
    static TEXTURE_MAG_FILTER : number ;
    static TEXTURE_MIN_FILTER : number ;
    static TEXTURE_WRAP_S : number ;
    static TEXTURE_WRAP_T : number ;
    static TRIANGLES : number ;
    static TRIANGLE_FAN : number ;
    static TRIANGLE_STRIP : number ;
    static UNPACK_ALIGNMENT : number ;
    static UNPACK_COLORSPACE_CONVERSION_WEBGL : number ;
    static UNPACK_FLIP_Y_WEBGL : number ;
    static UNPACK_PREMULTIPLY_ALPHA_WEBGL : number ;
    static UNSIGNED_BYTE : number ;
    static UNSIGNED_INT : number ;
    static UNSIGNED_SHORT : number ;
    static UNSIGNED_SHORT_4_4_4_4 : number ;
    static UNSIGNED_SHORT_5_5_5_1 : number ;
    static UNSIGNED_SHORT_5_6_5 : number ;
    static VALIDATE_STATUS : number ;
    static VENDOR : number ;
    static VERSION : number ;
    static VERTEX_ATTRIB_ARRAY_BUFFER_BINDING : number ;
    static VERTEX_ATTRIB_ARRAY_ENABLED : number ;
    static VERTEX_ATTRIB_ARRAY_NORMALIZED : number ;
    static VERTEX_ATTRIB_ARRAY_POINTER : number ;
    static VERTEX_ATTRIB_ARRAY_SIZE : number ;
    static VERTEX_ATTRIB_ARRAY_STRIDE : number ;
    static VERTEX_ATTRIB_ARRAY_TYPE : number ;
    static VERTEX_SHADER : number ;
    static VIEWPORT : number ;
    static ZERO : number ;
  }
  class WebGLRenderingContext_Instance {
    private noStructuralTyping_: any;
    ACTIVE_ATTRIBUTES : number ;
    ACTIVE_TEXTURE : number ;
    ACTIVE_UNIFORMS : number ;
    ALIASED_LINE_WIDTH_RANGE : number ;
    ALIASED_POINT_SIZE_RANGE : number ;
    ALPHA : number ;
    ALPHA_BITS : number ;
    ALWAYS : number ;
    ARRAY_BUFFER : number ;
    ARRAY_BUFFER_BINDING : number ;
    ATTACHED_SHADERS : number ;
    BACK : number ;
    BLEND : number ;
    BLEND_COLOR : number ;
    BLEND_DST_ALPHA : number ;
    BLEND_DST_RGB : number ;
    BLEND_EQUATION : number ;
    BLEND_EQUATION_ALPHA : number ;
    BLEND_EQUATION_RGB : number ;
    BLEND_SRC_ALPHA : number ;
    BLEND_SRC_RGB : number ;
    BLUE_BITS : number ;
    BOOL : number ;
    BOOL_VEC2 : number ;
    BOOL_VEC3 : number ;
    BOOL_VEC4 : number ;
    BROWSER_DEFAULT_WEBGL : number ;
    BUFFER_SIZE : number ;
    BUFFER_USAGE : number ;
    BYTE : number ;
    CCW : number ;
    CLAMP_TO_EDGE : number ;
    COLOR_ATTACHMENT0 : number ;
    COLOR_BUFFER_BIT : number ;
    COLOR_CLEAR_VALUE : number ;
    COLOR_WRITEMASK : number ;
    COMPILE_STATUS : number ;
    COMPRESSED_TEXTURE_FORMATS : number ;
    CONSTANT_ALPHA : number ;
    CONSTANT_COLOR : number ;
    CONTEXT_LOST_WEBGL : number ;
    CULL_FACE : number ;
    CULL_FACE_MODE : number ;
    CURRENT_PROGRAM : number ;
    CURRENT_VERTEX_ATTRIB : number ;
    CW : number ;
    DECR : number ;
    DECR_WRAP : number ;
    DELETE_STATUS : number ;
    DEPTH_ATTACHMENT : number ;
    DEPTH_BITS : number ;
    DEPTH_BUFFER_BIT : number ;
    DEPTH_CLEAR_VALUE : number ;
    DEPTH_COMPONENT : number ;
    DEPTH_COMPONENT16 : number ;
    DEPTH_FUNC : number ;
    DEPTH_RANGE : number ;
    DEPTH_STENCIL : number ;
    DEPTH_STENCIL_ATTACHMENT : number ;
    DEPTH_TEST : number ;
    DEPTH_WRITEMASK : number ;
    DITHER : number ;
    DONT_CARE : number ;
    DST_ALPHA : number ;
    DST_COLOR : number ;
    DYNAMIC_DRAW : number ;
    ELEMENT_ARRAY_BUFFER : number ;
    ELEMENT_ARRAY_BUFFER_BINDING : number ;
    EQUAL : number ;
    FASTEST : number ;
    FLOAT : number ;
    FLOAT_MAT2 : number ;
    FLOAT_MAT3 : number ;
    FLOAT_MAT4 : number ;
    FLOAT_VEC2 : number ;
    FLOAT_VEC3 : number ;
    FLOAT_VEC4 : number ;
    FRAGMENT_SHADER : number ;
    FRAMEBUFFER : number ;
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME : number ;
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE : number ;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE : number ;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL : number ;
    FRAMEBUFFER_BINDING : number ;
    FRAMEBUFFER_COMPLETE : number ;
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT : number ;
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS : number ;
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT : number ;
    FRAMEBUFFER_UNSUPPORTED : number ;
    FRONT : number ;
    FRONT_AND_BACK : number ;
    FRONT_FACE : number ;
    FUNC_ADD : number ;
    FUNC_REVERSE_SUBTRACT : number ;
    FUNC_SUBTRACT : number ;
    GENERATE_MIPMAP_HINT : number ;
    GEQUAL : number ;
    GREATER : number ;
    GREEN_BITS : number ;
    HIGH_FLOAT : number ;
    HIGH_INT : number ;
    INCR : number ;
    INCR_WRAP : number ;
    INT : number ;
    INT_VEC2 : number ;
    INT_VEC3 : number ;
    INT_VEC4 : number ;
    INVALID_ENUM : number ;
    INVALID_FRAMEBUFFER_OPERATION : number ;
    INVALID_OPERATION : number ;
    INVALID_VALUE : number ;
    INVERT : number ;
    KEEP : number ;
    LEQUAL : number ;
    LESS : number ;
    LINEAR : number ;
    LINEAR_MIPMAP_LINEAR : number ;
    LINEAR_MIPMAP_NEAREST : number ;
    LINES : number ;
    LINE_LOOP : number ;
    LINE_STRIP : number ;
    LINE_WIDTH : number ;
    LINK_STATUS : number ;
    LOW_FLOAT : number ;
    LOW_INT : number ;
    LUMINANCE : number ;
    LUMINANCE_ALPHA : number ;
    MAX_COMBINED_TEXTURE_IMAGE_UNITS : number ;
    MAX_CUBE_MAP_TEXTURE_SIZE : number ;
    MAX_FRAGMENT_UNIFORM_VECTORS : number ;
    MAX_RENDERBUFFER_SIZE : number ;
    MAX_TEXTURE_IMAGE_UNITS : number ;
    MAX_TEXTURE_SIZE : number ;
    MAX_VARYING_VECTORS : number ;
    MAX_VERTEX_ATTRIBS : number ;
    MAX_VERTEX_TEXTURE_IMAGE_UNITS : number ;
    MAX_VERTEX_UNIFORM_VECTORS : number ;
    MAX_VIEWPORT_DIMS : number ;
    MEDIUM_FLOAT : number ;
    MEDIUM_INT : number ;
    MIRRORED_REPEAT : number ;
    NEAREST : number ;
    NEAREST_MIPMAP_LINEAR : number ;
    NEAREST_MIPMAP_NEAREST : number ;
    NEVER : number ;
    NICEST : number ;
    NONE : number ;
    NOTEQUAL : number ;
    NO_ERROR : number ;
    ONE : number ;
    ONE_MINUS_CONSTANT_ALPHA : number ;
    ONE_MINUS_CONSTANT_COLOR : number ;
    ONE_MINUS_DST_ALPHA : number ;
    ONE_MINUS_DST_COLOR : number ;
    ONE_MINUS_SRC_ALPHA : number ;
    ONE_MINUS_SRC_COLOR : number ;
    OUT_OF_MEMORY : number ;
    PACK_ALIGNMENT : number ;
    POINTS : number ;
    POLYGON_OFFSET_FACTOR : number ;
    POLYGON_OFFSET_FILL : number ;
    POLYGON_OFFSET_UNITS : number ;
    RED_BITS : number ;
    RENDERBUFFER : number ;
    RENDERBUFFER_ALPHA_SIZE : number ;
    RENDERBUFFER_BINDING : number ;
    RENDERBUFFER_BLUE_SIZE : number ;
    RENDERBUFFER_DEPTH_SIZE : number ;
    RENDERBUFFER_GREEN_SIZE : number ;
    RENDERBUFFER_HEIGHT : number ;
    RENDERBUFFER_INTERNAL_FORMAT : number ;
    RENDERBUFFER_RED_SIZE : number ;
    RENDERBUFFER_STENCIL_SIZE : number ;
    RENDERBUFFER_WIDTH : number ;
    RENDERER : number ;
    REPEAT : number ;
    REPLACE : number ;
    RGB : number ;
    RGB565 : number ;
    RGB5_A1 : number ;
    RGBA : number ;
    RGBA4 : number ;
    SAMPLER_2D : number ;
    SAMPLER_CUBE : number ;
    SAMPLES : number ;
    SAMPLE_ALPHA_TO_COVERAGE : number ;
    SAMPLE_BUFFERS : number ;
    SAMPLE_COVERAGE : number ;
    SAMPLE_COVERAGE_INVERT : number ;
    SAMPLE_COVERAGE_VALUE : number ;
    SCISSOR_BOX : number ;
    SCISSOR_TEST : number ;
    SHADER_TYPE : number ;
    SHADING_LANGUAGE_VERSION : number ;
    SHORT : number ;
    SRC_ALPHA : number ;
    SRC_ALPHA_SATURATE : number ;
    SRC_COLOR : number ;
    STATIC_DRAW : number ;
    STENCIL_ATTACHMENT : number ;
    STENCIL_BACK_FAIL : number ;
    STENCIL_BACK_FUNC : number ;
    STENCIL_BACK_PASS_DEPTH_FAIL : number ;
    STENCIL_BACK_PASS_DEPTH_PASS : number ;
    STENCIL_BACK_REF : number ;
    STENCIL_BACK_VALUE_MASK : number ;
    STENCIL_BACK_WRITEMASK : number ;
    STENCIL_BITS : number ;
    STENCIL_BUFFER_BIT : number ;
    STENCIL_CLEAR_VALUE : number ;
    STENCIL_FAIL : number ;
    STENCIL_FUNC : number ;
    STENCIL_INDEX : number ;
    STENCIL_INDEX8 : number ;
    STENCIL_PASS_DEPTH_FAIL : number ;
    STENCIL_PASS_DEPTH_PASS : number ;
    STENCIL_REF : number ;
    STENCIL_TEST : number ;
    STENCIL_VALUE_MASK : number ;
    STENCIL_WRITEMASK : number ;
    STREAM_DRAW : number ;
    SUBPIXEL_BITS : number ;
    TEXTURE : number ;
    TEXTURE0 : number ;
    TEXTURE1 : number ;
    TEXTURE10 : number ;
    TEXTURE11 : number ;
    TEXTURE12 : number ;
    TEXTURE13 : number ;
    TEXTURE14 : number ;
    TEXTURE15 : number ;
    TEXTURE16 : number ;
    TEXTURE17 : number ;
    TEXTURE18 : number ;
    TEXTURE19 : number ;
    TEXTURE2 : number ;
    TEXTURE20 : number ;
    TEXTURE21 : number ;
    TEXTURE22 : number ;
    TEXTURE23 : number ;
    TEXTURE24 : number ;
    TEXTURE25 : number ;
    TEXTURE26 : number ;
    TEXTURE27 : number ;
    TEXTURE28 : number ;
    TEXTURE29 : number ;
    TEXTURE3 : number ;
    TEXTURE30 : number ;
    TEXTURE31 : number ;
    TEXTURE4 : number ;
    TEXTURE5 : number ;
    TEXTURE6 : number ;
    TEXTURE7 : number ;
    TEXTURE8 : number ;
    TEXTURE9 : number ;
    TEXTURE_2D : number ;
    TEXTURE_BINDING_2D : number ;
    TEXTURE_BINDING_CUBE_MAP : number ;
    TEXTURE_CUBE_MAP : number ;
    TEXTURE_CUBE_MAP_NEGATIVE_X : number ;
    TEXTURE_CUBE_MAP_NEGATIVE_Y : number ;
    TEXTURE_CUBE_MAP_NEGATIVE_Z : number ;
    TEXTURE_CUBE_MAP_POSITIVE_X : number ;
    TEXTURE_CUBE_MAP_POSITIVE_Y : number ;
    TEXTURE_CUBE_MAP_POSITIVE_Z : number ;
    TEXTURE_MAG_FILTER : number ;
    TEXTURE_MIN_FILTER : number ;
    TEXTURE_WRAP_S : number ;
    TEXTURE_WRAP_T : number ;
    TRIANGLES : number ;
    TRIANGLE_FAN : number ;
    TRIANGLE_STRIP : number ;
    UNPACK_ALIGNMENT : number ;
    UNPACK_COLORSPACE_CONVERSION_WEBGL : number ;
    UNPACK_FLIP_Y_WEBGL : number ;
    UNPACK_PREMULTIPLY_ALPHA_WEBGL : number ;
    UNSIGNED_BYTE : number ;
    UNSIGNED_INT : number ;
    UNSIGNED_SHORT : number ;
    UNSIGNED_SHORT_4_4_4_4 : number ;
    UNSIGNED_SHORT_5_5_5_1 : number ;
    UNSIGNED_SHORT_5_6_5 : number ;
    VALIDATE_STATUS : number ;
    VENDOR : number ;
    VERSION : number ;
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING : number ;
    VERTEX_ATTRIB_ARRAY_ENABLED : number ;
    VERTEX_ATTRIB_ARRAY_NORMALIZED : number ;
    VERTEX_ATTRIB_ARRAY_POINTER : number ;
    VERTEX_ATTRIB_ARRAY_SIZE : number ;
    VERTEX_ATTRIB_ARRAY_STRIDE : number ;
    VERTEX_ATTRIB_ARRAY_TYPE : number ;
    VERTEX_SHADER : number ;
    VIEWPORT : number ;
    ZERO : number ;
    activeTexture (texture : number ) : any ;
    attachShader (program : WebGLProgram , shader : WebGLShader ) : any ;
    bindAttribLocation (program : WebGLProgram , index : number , name : string ) : any ;
    bindBuffer (target : number , buffer : WebGLBuffer ) : any ;
    bindFramebuffer (target : number , buffer : WebGLFramebuffer ) : any ;
    bindRenderbuffer (target : number , buffer : WebGLRenderbuffer ) : any ;
    bindTexture (target : number , texture : WebGLTexture ) : any ;
    blendColor (red : number , green : number , blue : number , alpha : number ) : any ;
    blendEquation (mode : number ) : any ;
    blendEquationSeparate (modeRGB : number , modeAlpha : number ) : any ;
    blendFunc (sfactor : number , dfactor : number ) : any ;
    blendFuncSeparate (srcRGB : number , dstRGB : number , srcAlpha : number , dstAlpha : number ) : any ;
    bufferData (target : number , data : ArrayBufferView | ArrayBuffer | number , usage : number ) : any ;
    bufferSubData (target : number , offset : number , data : ArrayBufferView | ArrayBuffer ) : any ;
    canvas : HTMLCanvasElement ;
    checkFramebufferStatus (target : number ) : number ;
    clear (mask : number ) : any ;
    clearColor (red : number , green : number , blue : number , alpha : number ) : any ;
    clearDepth (depth : number ) : any ;
    clearStencil (s : number ) : any ;
    colorMask (red : boolean , green : boolean , blue : boolean , alpha : boolean ) : any ;
    compileShader (shader : WebGLShader ) : any ;
    compressedTexImage2D (target : number , level : number , internalformat : number , width : number , height : number , border : number , data : ArrayBufferView ) : any ;
    compressedTexSubImage2D (target : number , level : number , xoffset : number , yoffset : number , width : number , height : number , format : number , data : ArrayBufferView ) : any ;
    copyTexImage2D (target : number , level : number , format : number , x : number , y : number , width : number , height : number , border : number ) : any ;
    copyTexSubImage2D (target : number , level : number , xoffset : number , yoffset : number , x : number , y : number , width : number , height : number ) : any ;
    createBuffer ( ) : WebGLBuffer ;
    createFramebuffer ( ) : WebGLFramebuffer ;
    createProgram ( ) : WebGLProgram ;
    createRenderbuffer ( ) : WebGLRenderbuffer ;
    createShader (type : number ) : WebGLShader ;
    createTexture ( ) : WebGLTexture ;
    cullFace (mode : number ) : any ;
    deleteBuffer (buffer : WebGLBuffer ) : any ;
    deleteFramebuffer (buffer : WebGLFramebuffer ) : any ;
    deleteProgram (program : WebGLProgram ) : any ;
    deleteRenderbuffer (buffer : WebGLRenderbuffer ) : any ;
    deleteShader (shader : WebGLShader ) : any ;
    deleteTexture (texture : WebGLTexture ) : any ;
    depthFunc (func : number ) : any ;
    depthMask (flag : boolean ) : any ;
    depthRange (nearVal : number , farVal : number ) : any ;
    detachShader (program : WebGLProgram , shader : WebGLShader ) : any ;
    disable (flags : number ) : any ;
    disableVertexAttribArray (index : number ) : any ;
    drawArrays (mode : number , first : number , count : number ) : any ;
    drawElements (mode : number , count : number , type : number , offset : number ) : any ;
    drawingBufferHeight : number ;
    drawingBufferWidth : number ;
    enable (cap : number ) : any ;
    enableVertexAttribArray (index : number ) : any ;
    finish ( ) : any ;
    flush ( ) : any ;
    framebufferRenderbuffer (target : number , attachment : number , renderbuffertarget : number , renderbuffer : WebGLRenderbuffer ) : any ;
    framebufferTexture2D (target : number , attachment : number , textarget : number , texture : WebGLTexture , level : number ) : any ;
    frontFace (mode : number ) : any ;
    generateMipmap (target : number ) : any ;
    getActiveAttrib (program : WebGLProgram , index : number ) : WebGLActiveInfo ;
    getActiveUniform (program : WebGLProgram , index : number ) : WebGLActiveInfo ;
    getAttachedShaders (program : WebGLProgram ) : ( WebGLShader ) [] ;
    getAttribLocation (program : WebGLProgram , name : string ) : number ;
    getBufferParameter (target : number , pname : number ) : any ;
    getContextAttributes ( ) : WebGLContextAttributes ;
    getError ( ) : number ;
    /**
     * Note that this has side effects by enabling the extension even if the
     * result is not used.
     */
    getExtension (name : string ) : Object ;
    getFramebufferAttachmentParameter (target : number , attachment : number , pname : number ) : any ;
    getParameter (pname : number ) : any ;
    getProgramInfoLog (program : WebGLProgram ) : string ;
    getProgramParameter (program : WebGLProgram , pname : number ) : any ;
    getRenderbufferParameter (target : number , pname : number ) : any ;
    getShaderInfoLog (shader : WebGLShader ) : string ;
    getShaderParameter (shader : WebGLShader , pname : number ) : any ;
    getShaderPrecisionFormat (shadertype : number , precisiontype : number ) : WebGLShaderPrecisionFormat ;
    getShaderSource (shader : WebGLShader ) : string ;
    getSupportedExtensions ( ) : string [] ;
    getTexParameter (target : number , pname : number ) : any ;
    getUniform (program : WebGLProgram , location : WebGLUniformLocation ) : any ;
    getUniformLocation (program : WebGLProgram , name : string ) : WebGLUniformLocation ;
    getVertexAttrib (index : number , pname : number ) : any ;
    getVertexAttribOffset (index : number , pname : number ) : number ;
    hint (target : number , mode : number ) : any ;
    isBuffer (buffer : WebGLObject ) : boolean ;
    isContextLost ( ) : boolean ;
    isEnabled (cap : number ) : boolean ;
    isFramebuffer (framebuffer : WebGLObject ) : boolean ;
    isProgram (program : WebGLObject ) : boolean ;
    isRenderbuffer (renderbuffer : WebGLObject ) : boolean ;
    isShader (shader : WebGLObject ) : boolean ;
    isTexture (texture : WebGLObject ) : boolean ;
    lineWidth (width : number ) : any ;
    linkProgram (program : WebGLProgram ) : any ;
    pixelStorei (pname : number , param : number ) : any ;
    polygonOffset (factor : number , units : number ) : any ;
    readPixels (x : number , y : number , width : number , height : number , format : number , type : number , pixels : ArrayBufferView ) : any ;
    renderbufferStorage (target : number , internalformat : number , width : number , height : number ) : any ;
    sampleCoverage (coverage : number , invert : boolean ) : any ;
    scissor (x : number , y : number , width : number , height : number ) : any ;
    shaderSource (shader : WebGLShader , source : string ) : any ;
    stencilFunc (func : number , ref : number , mask : number ) : any ;
    stencilFuncSeparate (face : number , func : number , ref : number , mask : number ) : any ;
    stencilMask (mask : number ) : any ;
    stencilMaskSeparate (face : number , mask : number ) : any ;
    stencilOp (fail : number , zfail : number , zpass : number ) : any ;
    stencilOpSeparate (face : number , fail : number , zfail : number , zpass : number ) : any ;
    texImage2D (target : number , level : number , internalformat : number , format : number , type : number , img : ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | number , opt_format ? : number , opt_type ? : number , opt_pixels ? : ArrayBufferView ) : any ;
    texParameterf (target : number , pname : number , param : number ) : any ;
    texParameteri (target : number , pname : number , param : number ) : any ;
    texSubImage2D (target : number , level : number , xoffset : number , yoffset : number , format : number , type : number , data : ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | number , opt_type ? : number , opt_pixels ? : ArrayBufferView ) : any ;
    uniform1f (location : WebGLUniformLocation , value : number ) : any ;
    uniform1fv (location : WebGLUniformLocation , value : Float32Array | number [] ) : any ;
    uniform1i (location : WebGLUniformLocation , value : number | boolean ) : any ;
    uniform1iv (location : WebGLUniformLocation , value : Int32Array | any [] ) : any ;
    uniform2f (location : WebGLUniformLocation , value1 : number , value2 : number ) : any ;
    uniform2fv (location : WebGLUniformLocation , value : Float32Array | number [] ) : any ;
    uniform2i (location : WebGLUniformLocation , value1 : number | boolean , value2 : number | boolean ) : any ;
    uniform2iv (location : WebGLUniformLocation , value : Int32Array | any [] ) : any ;
    uniform3f (location : WebGLUniformLocation , value1 : number , value2 : number , value3 : number ) : any ;
    uniform3fv (location : WebGLUniformLocation , value : Float32Array | number [] ) : any ;
    uniform3i (location : WebGLUniformLocation , value1 : number | boolean , value2 : number | boolean , value3 : number | boolean ) : any ;
    uniform3iv (location : WebGLUniformLocation , value : Int32Array | any [] ) : any ;
    uniform4f (location : WebGLUniformLocation , value1 : number , value2 : number , value3 : number , value4 : number ) : any ;
    uniform4fv (location : WebGLUniformLocation , value : Float32Array | number [] ) : any ;
    uniform4i (location : WebGLUniformLocation , value1 : number | boolean , value2 : number | boolean , value3 : number | boolean , value4 : number | boolean ) : any ;
    uniform4iv (location : WebGLUniformLocation , value : Int32Array | any [] ) : any ;
    uniformMatrix2fv (location : WebGLUniformLocation , transpose : boolean , data : Float32Array | number [] ) : any ;
    uniformMatrix3fv (location : WebGLUniformLocation , transpose : boolean , data : Float32Array | number [] ) : any ;
    uniformMatrix4fv (location : WebGLUniformLocation , transpose : boolean , data : Float32Array | number [] ) : any ;
    useProgram (program : WebGLProgram ) : any ;
    validateProgram (program : WebGLProgram ) : any ;
    vertexAttrib1f (indx : number , x : number ) : any ;
    vertexAttrib1fv (indx : number , values : Float32Array | number [] ) : any ;
    vertexAttrib2f (indx : number , x : number , y : number ) : any ;
    vertexAttrib2fv (indx : number , values : Float32Array | number [] ) : any ;
    vertexAttrib3f (indx : number , x : number , y : number , z : number ) : any ;
    vertexAttrib3fv (indx : number , values : Float32Array | number [] ) : any ;
    vertexAttrib4f (indx : number , x : number , y : number , z : number , w : number ) : any ;
    vertexAttrib4fv (indx : number , values : Float32Array | number [] ) : any ;
    vertexAttribPointer (indx : number , size : number , type : number , normalized : boolean , stride : number , offset : number ) : any ;
    viewport (x : number , y : number , width : number , height : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLContextAttributes extends WebGLContextAttributes_Instance {
  }
  class WebGLContextAttributes_Instance {
    private noStructuralTyping_: any;
    alpha : boolean ;
    antialias : boolean ;
    depth : boolean ;
    failIfMajorPerformanceCaveat : boolean ;
    preferLowPowerToHighPerformance : boolean ;
    premultipliedAlpha : boolean ;
    preserveDrawingBuffer : boolean ;
    stencil : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLContextEvent extends WebGLContextEvent_Instance {
  }
  class WebGLContextEvent_Instance extends Event_Instance {
    constructor (eventType : string ) ;
    statusMessage : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLShaderPrecisionFormat extends WebGLShaderPrecisionFormat_Instance {
  }
  class WebGLShaderPrecisionFormat_Instance {
    private noStructuralTyping_: any;
    precision : number ;
    rangeMax : number ;
    rangeMin : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLObject extends WebGLObject_Instance {
  }
  class WebGLObject_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLBuffer extends WebGLBuffer_Instance {
  }
  class WebGLBuffer_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLFramebuffer extends WebGLFramebuffer_Instance {
  }
  class WebGLFramebuffer_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLProgram extends WebGLProgram_Instance {
  }
  class WebGLProgram_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLRenderbuffer extends WebGLRenderbuffer_Instance {
  }
  class WebGLRenderbuffer_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLShader extends WebGLShader_Instance {
  }
  class WebGLShader_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLTexture extends WebGLTexture_Instance {
  }
  class WebGLTexture_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLActiveInfo extends WebGLActiveInfo_Instance {
  }
  class WebGLActiveInfo_Instance {
    private noStructuralTyping_: any;
    name : string ;
    size : number ;
    type : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLUniformLocation extends WebGLUniformLocation_Instance {
  }
  class WebGLUniformLocation_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_texture_float extends OES_texture_float_Instance {
  }
  class OES_texture_float_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_texture_half_float extends OES_texture_half_float_Instance {
  }
  class OES_texture_half_float_Instance {
    private noStructuralTyping_: any;
    HALF_FLOAT_OES : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WEBGL_lose_context extends WEBGL_lose_context_Instance {
  }
  class WEBGL_lose_context_Instance {
    private noStructuralTyping_: any;
    loseContext ( ) : any ;
    restoreContext ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_standard_derivatives extends OES_standard_derivatives_Instance {
  }
  class OES_standard_derivatives_Instance {
    private noStructuralTyping_: any;
    FRAGMENT_SHADER_DERIVATIVE_HINT_OES : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebGLVertexArrayObjectOES extends WebGLVertexArrayObjectOES_Instance {
  }
  class WebGLVertexArrayObjectOES_Instance extends WebGLObject_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_vertex_array_object extends OES_vertex_array_object_Instance {
  }
  class OES_vertex_array_object_Instance {
    private noStructuralTyping_: any;
    VERTEX_ARRAY_BINDING_OES : number ;
    bindVertexArrayOES (arrayObject : WebGLVertexArrayObjectOES ) : any ;
    createVertexArrayOES ( ) : WebGLVertexArrayObjectOES ;
    deleteVertexArrayOES (arrayObject : WebGLVertexArrayObjectOES ) : any ;
    isVertexArrayOES (arrayObject : WebGLVertexArrayObjectOES ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WEBGL_debug_renderer_info extends WEBGL_debug_renderer_info_Instance {
  }
  class WEBGL_debug_renderer_info_Instance {
    private noStructuralTyping_: any;
    UNMASKED_RENDERER_WEBGL : number ;
    UNMASKED_VENDOR_WEBGL : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WEBGL_debug_shaders extends WEBGL_debug_shaders_Instance {
  }
  class WEBGL_debug_shaders_Instance {
    private noStructuralTyping_: any;
    getTranslatedShaderSource (shader : WebGLShader ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WEBGL_compressed_texture_s3tc extends WEBGL_compressed_texture_s3tc_Instance {
  }
  class WEBGL_compressed_texture_s3tc_Instance {
    private noStructuralTyping_: any;
    COMPRESSED_RGBA_S3TC_DXT1_EXT : number ;
    COMPRESSED_RGBA_S3TC_DXT3_EXT : number ;
    COMPRESSED_RGBA_S3TC_DXT5_EXT : number ;
    COMPRESSED_RGB_S3TC_DXT1_EXT : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_depth_texture extends OES_depth_texture_Instance {
  }
  class OES_depth_texture_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OES_element_index_uint extends OES_element_index_uint_Instance {
  }
  class OES_element_index_uint_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class EXT_texture_filter_anisotropic extends EXT_texture_filter_anisotropic_Instance {
  }
  class EXT_texture_filter_anisotropic_Instance {
    private noStructuralTyping_: any;
    MAX_TEXTURE_MAX_ANISOTROPY_EXT : number ;
    TEXTURE_MAX_ANISOTROPY_EXT : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ANGLE_instanced_arrays extends ANGLE_instanced_arrays_Instance {
  }
  class ANGLE_instanced_arrays_Instance {
    private noStructuralTyping_: any;
    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE : number ;
    drawArraysInstancedANGLE (mode : number , first : number , count : number , primcount : number ) : any ;
    drawElementsInstancedANGLE (mode : number , count : number , type : number , offset : number , primcount : number ) : any ;
    vertexAttribDivisorANGLE (index : number , divisor : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Notification extends Notification_Instance {
    static permission : string ;
    static requestPermission (opt_callback ? : (a : string ) => any ) : any ;
  }
  class Notification_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (title : string , opt_options ? : { body ? : string , dir ? : string , icon ? : string , lang ? : string , tag ? : string } ) ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    body : string ;
    /**
     * Prevents the notification from being displayed, or closes it if it is already
     * displayed.
     */
    cancel ( ) : any ;
    /**
     * Prevents the notification from being displayed, or closes it if it is already
     * displayed.
     */
    close : ( ) => any ;
    /**
     * The string used by clients to specify the directionality (rtl/ltr) of the
     * notification.
     */
    dir : string ;
    dispatchEvent (evt : Event ) : boolean ;
    icon : string ;
    /**
     * An event handler called when the notification has been clicked on.
     */
    onclick : (a : Event ) => any ;
    /**
     * An event handler called when notification is closed.
     */
    onclose : (a : Event ) => any ;
    /**
     * An event handler called when the notification has become visible.
     */
    ondisplay : (a : Event ) => any ;
    /**
     * An event handler called if the notification could not be displayed due to
     * an error (i.e. resource could not be loaded).
     */
    onerror : (a : Event ) => any ;
    /**
     * An event handler called when the notification has become visible.
     */
    onshow : (a : Event ) => any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    /**
     * The ID used by clients to uniquely identify notifications to eliminate
     * duplicate notifications.
     */
    replaceId : string ;
    /**
     * Displays the notification.
     */
    show ( ) : any ;
    /**
     * The string used by clients to identify the notification.
     */
    tag : string ;
    title : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NotificationCenter extends NotificationCenter_Instance {
  }
  class NotificationCenter_Instance {
    private noStructuralTyping_: any;
    /**
     * Checks if the user has permission to display notifications.
     */
    checkPermission ( ) : number ;
    /**
     * Creates an HTML notification and displays it to the user.
     */
    createHTMLNotification (url : string ) : Notification ;
    /**
     * Creates a text+icon notification and displays it to the user.
     */
    createNotification (iconUrl : string , title : string , body : string ) : Notification ;
    /**
     * Requests permission from the user to display notifications.
     */
    requestPermission (opt_callback ? : ( ...a : any [] ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class NotificationEvent extends NotificationEvent_Instance {
  }
  class NotificationEvent_Instance extends ExtendableEvent_Instance {
    constructor (type : string , opt_eventInitDict ? : { bubbles ? : boolean , cancelable ? : boolean } ) ;
    notification : Notification ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface NotificationOptionsInterface_ {
    body : string ;
    dir : string ;
    icon : string ;
    lang : string ;
    tag : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * XMLSerializer can be used to convert DOM subtree or DOM document into text.
   * XMLSerializer is available to unprivileged scripts.
   *
   * XMLSerializer is mainly useful for applications and extensions based on
   * Mozilla platform. While it's available to web pages, it's not part of any
   * standard and level of support in other browsers is unknown.
   */
  class XMLSerializer extends XMLSerializer_Instance {
  }
  class XMLSerializer_Instance {
    private noStructuralTyping_: any;
    /**
     * The subtree rooted by the specified element is serialized to a byte stream
     * using the character set specified.
     */
    serializeToStream (subtree : Node ) : Object ;
    /**
     * Returns the serialized subtree in the form of a string
     */
    serializeToString (subtree : Node ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * DOMParser is mainly useful for applications and extensions based on Mozilla
   * platform. While it's available to web pages, it's not part of any standard and
   * level of support in other browsers is unknown.
   */
  class DOMParser extends DOMParser_Instance {
  }
  class DOMParser_Instance {
    private noStructuralTyping_: any;
    /**
     * The string passed in is parsed into a DOM document.
     *
     * Example:
     * var parser = new DOMParser();
     * var doc = parser.parseFromString(aStr, "text/xml");
     * @param src The UTF16 string to be parsed.
     * @param type The content type of the string.
     */
    parseFromString (src : string , type : string ) : Document ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PerformanceTiming extends PerformanceTiming_Instance {
  }
  class PerformanceTiming_Instance {
    private noStructuralTyping_: any;
    connectEnd : number ;
    connectStart : number ;
    domComplete : number ;
    domContentLoadedEventEnd : number ;
    domContentLoadedEventStart : number ;
    domInteractive : number ;
    domLoading : number ;
    domainLookupEnd : number ;
    domainLookupStart : number ;
    fetchStart : number ;
    loadEventEnd : number ;
    loadEventStart : number ;
    navigationStart : number ;
    redirectEnd : number ;
    redirectStart : number ;
    requestStart : number ;
    responseEnd : number ;
    responseStart : number ;
    secureConnectionStart : number ;
    unloadEventEnd : number ;
    unloadEventStart : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PerformanceEntry extends PerformanceEntry_Instance {
  }
  class PerformanceEntry_Instance {
    private noStructuralTyping_: any;
    duration : number ;
    entryType : string ;
    name : string ;
    startTime : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PerformanceResourceTiming extends PerformanceResourceTiming_Instance {
  }
  class PerformanceResourceTiming_Instance extends PerformanceEntry_Instance {
    connectEnd : number ;
    connectStart : number ;
    domainLookupEnd : number ;
    domainLookupStart : number ;
    fetchStart : number ;
    initiatorType : string ;
    redirectEnd : number ;
    redirectStart : number ;
    requestStart : number ;
    responseEnd : number ;
    responseStart : number ;
    secureConnectionStart : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PerformanceNavigation extends PerformanceNavigation_Instance {
  }
  class PerformanceNavigation_Instance {
    private noStructuralTyping_: any;
    TYPE_BACK_FORWARD : number ;
    TYPE_NAVIGATE : number ;
    TYPE_RELOAD : number ;
    TYPE_RESERVED : number ;
    redirectCount : number ;
    type : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PerformanceMemory extends PerformanceMemory_Instance {
  }
  class PerformanceMemory_Instance {
    private noStructuralTyping_: any;
    jsHeapSizeLimit : number ;
    totalJSHeapSize : number ;
    usedJSHeapSize : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Performance extends Performance_Instance {
  }
  class Performance_Instance {
    private noStructuralTyping_: any;
    clearMarks (opt_markName ? : string ) : any ;
    clearMeasures (opt_measureName ? : string ) : any ;
    /**
     * Clears the buffer used to store the current list of
     * PerformanceResourceTiming resources.
     */
    clearResourceTimings ( ) : void ;
    getEntries ( ) : ( PerformanceEntry ) [] ;
    getEntriesByName (name : string , opt_entryType ? : string ) : ( PerformanceEntry ) [] ;
    getEntriesByType (entryType : string ) : ( PerformanceEntry ) [] ;
    mark (markName : string ) : any ;
    measure (measureName : string , opt_startMark ? : string , opt_endMark ? : string ) : any ;
    memory : PerformanceMemory ;
    navigation : PerformanceNavigation ;
    now ( ) : number ;
    /**
     * Set the maximum number of PerformanceResourceTiming resources that may be
     * stored in the buffer.
     */
    setResourceTimingBufferSize (maxSize : number ) : any ;
    timing : PerformanceTiming ;
    /**
     * Clear out the buffer of performance timing events for webkit browsers.
     */
    webkitClearResourceTimings ( ) : void ;
    webkitNow ( ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  type Algorithm = { name : string } ;
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  type AlgorithmIdentifier = string | { name : string } ;
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  class CryptoKey extends CryptoKey_Instance {
  }
  class CryptoKey_Instance {
    private noStructuralTyping_: any;
    algorithm : Object ;
    extractable : boolean ;
    type : string ;
    usages : Object ;
  }
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  type KeyAlgorithm = { name : string } ;
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  class JsonWebKey extends JsonWebKey_Instance {
  }
  class JsonWebKey_Instance {
    private noStructuralTyping_: any;
    alg : string ;
    crv : string ;
    d : string ;
    dp : string ;
    dq : string ;
    e : string ;
    ext : boolean ;
    k : string ;
    key_ops : string [] ;
    kty : string ;
    n : string ;
    oth : ಠ_ಠ.clutz.webCrypto.RsaOtherPrimesInfo [] ;
    p : string ;
    q : string ;
    qi : string ;
    use : string ;
    x : string ;
    y : string ;
  }
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  class RsaOtherPrimesInfo extends RsaOtherPrimesInfo_Instance {
  }
  class RsaOtherPrimesInfo_Instance {
    private noStructuralTyping_: any;
    d : string ;
    r : string ;
    t : string ;
  }
}
declare namespace ಠ_ಠ.clutz.webCrypto {
  class SubtleCrypto extends SubtleCrypto_Instance {
  }
  class SubtleCrypto_Instance {
    private noStructuralTyping_: any;
    decrypt (algorithm : string | { name : string } , key : ಠ_ಠ.clutz.webCrypto.CryptoKey , data : ArrayBuffer | ArrayBufferView ) : Promise < any > ;
    deriveBits (algorithm : string | { name : string } , baseKey : ಠ_ಠ.clutz.webCrypto.CryptoKey , length : number ) : Promise < any > ;
    deriveKey (algorithm : string | { name : string } , baseKey : ಠ_ಠ.clutz.webCrypto.CryptoKey , derivedKeyAlgo : string | { name : string } , extractable : boolean , keyUsages : string [] ) : Promise < any > ;
    digest (algorithm : string | { name : string } , data : ArrayBuffer | ArrayBufferView ) : Promise < any > ;
    encrypt (algorithm : string | { name : string } , key : ಠ_ಠ.clutz.webCrypto.CryptoKey , data : ArrayBuffer | ArrayBufferView ) : Promise < any > ;
    exportKey (format : string , key : ಠ_ಠ.clutz.webCrypto.CryptoKey ) : Promise < any > ;
    generateKey (algorithm : string | { name : string } , extractable : boolean , keyUsages : string [] ) : Promise < any > ;
    importKey (format : string , keyData : ArrayBuffer | ArrayBufferView | ಠ_ಠ.clutz.webCrypto.JsonWebKey , algorithm : string | { name : string } , extractable : boolean , keyUsages : string [] ) : Promise < any > ;
    sign (algorithm : string | { name : string } , key : ಠ_ಠ.clutz.webCrypto.CryptoKey , data : ArrayBuffer | ArrayBufferView ) : Promise < any > ;
    unwrapKey (format : string , wrappedKey : ArrayBuffer | ArrayBufferView , unwrappingKey : ಠ_ಠ.clutz.webCrypto.CryptoKey , unwrapAlgorithm : string | { name : string } , unwrappedKeyAlgorithm : string | { name : string } , extractable : boolean , keyUsages : string [] ) : Promise < any > ;
    verify (algorithm : string | { name : string } , key : ಠ_ಠ.clutz.webCrypto.CryptoKey , signature : ArrayBuffer | ArrayBufferView , data : ArrayBuffer | ArrayBufferView ) : Promise < any > ;
    wrapKey (format : string , key : ಠ_ಠ.clutz.webCrypto.CryptoKey , wrappingKey : ಠ_ಠ.clutz.webCrypto.CryptoKey , wrapAlgorithm : string | { name : string } ) : Promise < any > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Headers extends Headers_Instance {
  }
  class Headers_Instance {
    private noStructuralTyping_: any;
    constructor (opt_headersInit ? : Headers | string [] [] ) ;
    append (name : string , value : string ) : any ;
    delete (name : string ) : any ;
    get (name : string ) : string ;
    getAll (name : string ) : string [] ;
    has (name : string ) : boolean ;
    set (name : string , value : string ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Request extends Request_Instance {
  }
  class Request_Instance {
    private noStructuralTyping_: any;
    constructor (input : Request | string , opt_init ? : { body ? : Blob | FormData | string , cache ? : RequestCache , credentials ? : RequestCredentials , headers ? : Headers | string [] [] , method ? : string , mode ? : RequestMode } ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    bodyUsed : boolean ;
    cache : RequestCache ;
    clone ( ) : Request ;
    context : RequestContext ;
    credentials : RequestCredentials ;
    formData ( ) : Promise < FormData > ;
    headers : Headers ;
    json ( ) : Promise < Object > ;
    method : string ;
    mode : RequestMode ;
    referrer : string ;
    text ( ) : Promise < string > ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Response extends Response_Instance {
    static error ( ) : Response ;
    static redirect (url : string , opt_status ? : number ) : Response ;
  }
  class Response_Instance {
    private noStructuralTyping_: any;
    constructor (opt_body ? : Blob | FormData | string , opt_init ? : { headers : Headers | string [] [] , status : number , statusText : string } ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    body : ReadableByteStream ;
    bodyUsed : boolean ;
    clone ( ) : Response ;
    formData ( ) : Promise < FormData > ;
    headers : Headers ;
    json ( ) : Promise < Object > ;
    ok : boolean ;
    status : number ;
    statusText : string ;
    text ( ) : Promise < string > ;
    type : ResponseType ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type RequestContext = string ;
  var RequestContext : {
    AUDIO : RequestContext ,
    BEACON : RequestContext ,
    CSPREPORT : RequestContext ,
    DOWNLOAD : RequestContext ,
    EMBED : RequestContext ,
    EVENTSOURCE : RequestContext ,
    FAVICON : RequestContext ,
    FETCH : RequestContext ,
    FONT : RequestContext ,
    FORM : RequestContext ,
    FRAME : RequestContext ,
    HYPERLINK : RequestContext ,
    IFRAME : RequestContext ,
    IMAGE : RequestContext ,
    IMAGESET : RequestContext ,
    IMPORT : RequestContext ,
    INTERNAL : RequestContext ,
    LOCATION : RequestContext ,
    MANIFEST : RequestContext ,
    OBJECT : RequestContext ,
    PING : RequestContext ,
    PLUGIN : RequestContext ,
    PREFETCH : RequestContext ,
    SCRIPT : RequestContext ,
    SERVICEWORKER : RequestContext ,
    SHAREDWORKER : RequestContext ,
    STYLE : RequestContext ,
    SUBRESOURCE : RequestContext ,
    TRACK : RequestContext ,
    VIDEO : RequestContext ,
    WORKER : RequestContext ,
    XMLHTTPREQUEST : RequestContext ,
    XSLT : RequestContext ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type RequestMode = string ;
  var RequestMode : {
    CORS : RequestMode ,
    NO_CORS : RequestMode ,
    SAME_ORIGIN : RequestMode ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type RequestCredentials = string ;
  var RequestCredentials : {
    INCLUDE : RequestCredentials ,
    OMIT : RequestCredentials ,
    SAME_ORIGIN : RequestCredentials ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type RequestCache = string ;
  var RequestCache : {
    DEFAULT : RequestCache ,
    FORCE_CACHE : RequestCache ,
    NO_CACHE : RequestCache ,
    NO_STORE : RequestCache ,
    ONLY_IF_CACHED : RequestCache ,
    RELOAD : RequestCache ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type ResponseType = string ;
  var ResponseType : {
    BASIC : ResponseType ,
    CORS : ResponseType ,
    DEFAULT : ResponseType ,
    ERROR : ResponseType ,
    OPAQUE : ResponseType ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type VisibilityState = string ;
  var VisibilityState : {
    HIDDEN : VisibilityState ,
    PRERENDER : VisibilityState ,
    UNLOADED : VisibilityState ,
    VISIBLE : VisibilityState ,
  };
}
declare namespace ಠ_ಠ.clutz {
  interface BatteryManager extends EventTarget {
    charging : boolean ;
    chargingTime : number ;
    dischargingTime : number ;
    level : number ;
    onchargingchange : (a : Event ) => any ;
    onchargingtimechange : (a : Event ) => any ;
    ondischargingtimechange : (a : Event ) => any ;
    onlevelchange : (a : Event ) => any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CSSMatrix extends CSSMatrix_Instance {
  }
  class CSSMatrix_Instance {
    private noStructuralTyping_: any;
    constructor (opt_matrix ? : string ) ;
    inverse ( ) : CSSMatrix ;
    m11 : number ;
    m12 : number ;
    m13 : number ;
    m14 : number ;
    m21 : number ;
    m22 : number ;
    m23 : number ;
    m24 : number ;
    m31 : number ;
    m32 : number ;
    m33 : number ;
    m34 : number ;
    m41 : number ;
    m42 : number ;
    m43 : number ;
    m44 : number ;
    multiply (secondMatrix : CSSMatrix ) : CSSMatrix ;
    rotate (opt_rotX ? : number , opt_rotY ? : number , opt_rotZ ? : number ) : CSSMatrix ;
    rotateAxisAngle (opt_x ? : number , opt_y ? : number , opt_z ? : number , opt_angle ? : number ) : CSSMatrix ;
    scale (opt_scaleX ? : number , opt_scaleY ? : number , opt_scaleZ ? : number ) : CSSMatrix ;
    setMatrixValue (string : string ) : void ;
    translate (opt_x ? : number , opt_y ? : number , opt_z ? : number ) : CSSMatrix ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WebKitCSSMatrix extends WebKitCSSMatrix_Instance {
  }
  class WebKitCSSMatrix_Instance extends CSSMatrix_Instance {
    constructor (opt_matrix ? : string ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MSCSSMatrix extends MSCSSMatrix_Instance {
  }
  class MSCSSMatrix_Instance extends CSSMatrix_Instance {
    constructor (opt_matrix ? : string ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface SourceInfo {
    facing : boolean ;
    id : string ;
    kind : string ;
    label : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface MediaStreamTrack extends EventTarget {
    clone ( ) : MediaStreamTrack ;
    enabled : boolean ;
    id : string ;
    kind : string ;
    label : string ;
    muted : boolean ;
    onended : (a : Event ) => any ;
    onmute : (a : Event ) => any ;
    onunmute : (a : Event ) => any ;
    readyState : string ;
    remote : boolean ;
    stop ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var MediaStreamTrackEvent : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  class MediaStream extends MediaStream_Instance {
  }
  class MediaStream_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (streamOrTracks ? : MediaStream | MediaStreamTrack [] ) ;
    active : boolean ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    addTrack (track : MediaStreamTrack ) : any ;
    clone ( ) : MediaStream ;
    dispatchEvent (evt : Event ) : boolean ;
    ended : boolean ;
    getAudioTracks ( ) : MediaStreamTrack [] ;
    getTrackById (trackId : string ) : MediaStreamTrack ;
    getTracks ( ) : MediaStreamTrack [] ;
    getVideoTracks ( ) : MediaStreamTrack [] ;
    id : string ;
    /**
     * TODO(bemasc): Remove this property.
     */
    label : string ;
    onactive : (a : Event ) => any ;
    onaddtrack : (a : ಠ_ಠ.clutz.PrivateType ) => any ;
    onended : (a : Event ) => any ;
    oninactive : (a : Event ) => any ;
    onremovetrack : (a : ಠ_ಠ.clutz.PrivateType ) => any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    removeTrack (track : MediaStreamTrack ) : any ;
    stop ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var MediaTrackConstraintSetInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  var MediaTrackConstraintsInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  var MediaStreamConstraintsInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  interface NavigatorUserMediaError {
    PERMISSION_DENIED : number ;
    code : number ;
    constraintName : string ;
    message : string ;
    name : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaStreamEvent extends MediaStreamEvent_Instance {
  }
  class MediaStreamEvent_Instance {
    private noStructuralTyping_: any;
    constructor (type : string , eventInitDict : Object ) ;
    stream : MediaStream ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RTCSessionDescription extends RTCSessionDescription_Instance {
  }
  class RTCSessionDescription_Instance {
    private noStructuralTyping_: any;
    constructor (descriptionInitDict ? : Object ) ;
    sdp : string ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * TODO(bemasc): Remove this definition once it is removed from the browser.
   */
  class IceCandidate extends IceCandidate_Instance {
  }
  class IceCandidate_Instance {
    private noStructuralTyping_: any;
    /**
     * TODO(bemasc): Remove this definition once it is removed from the browser.
     * @param label The label index (audio/video/data -> 0,1,2)
     * @param sdp The ICE candidate in SDP text form
     */
    constructor (label : string , sdp : string ) ;
    label : string ;
    toSdp ( ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RTCIceCandidate extends RTCIceCandidate_Instance {
  }
  class RTCIceCandidate_Instance {
    private noStructuralTyping_: any;
    constructor (candidateInitDict ? : Object ) ;
    candidate : string ;
    sdpMLineIndex : number ;
    sdpMid : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var RTCIceServerInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  var RTCConfigurationInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  class RTCPeerConnectionIceEvent extends RTCPeerConnectionIceEvent_Instance {
  }
  class RTCPeerConnectionIceEvent_Instance {
    private noStructuralTyping_: any;
    constructor (type : string , eventInitDict : Object ) ;
    candidate : RTCIceCandidate ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface RTCStatsReport {
    id : string ;
    local : RTCStatsReport ;
    names ( ) : string [] ;
    remote : RTCStatsReport ;
    stat (name : string ) : string ;
    timestamp : Date ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface RTCStatsResponse {
    result ( ) : RTCStatsReport [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var MediaConstraintSetInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  var MediaConstraintsInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  interface RTCDataChannel {
    binaryType : string ;
    bufferedAmount : number ;
    close : ( ) => any ;
    label : string ;
    onclose : (a : Event ) => any ;
    onerror : (a : Event ) => any ;
    onmessage : (a : MessageEvent < any > ) => any ;
    onopen : (a : Event ) => any ;
    /**
     * An enumerated string type (RTCDataChannelState) with values:
     * "connecting", "open", "closing", and "closed".
     */
    readyState : string ;
    reliable : boolean ;
    send (data : string | Blob | ArrayBuffer | ArrayBufferView ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var RTCDataChannelEvent : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  var RTCDataChannelInitInterface_ : ಠ_ಠ.clutz.PrivateType;
}
declare namespace ಠ_ಠ.clutz {
  class RTCPeerConnection extends RTCPeerConnection_Instance {
  }
  class RTCPeerConnection_Instance implements EventTarget {
    private noStructuralTyping_: any;
    constructor (configuration : { iceServers : { url : string } [] } , constraints ? : Object ) ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    addIceCandidate (candidate : RTCIceCandidate ) : any ;
    addStream (stream : MediaStream , constraints ? : Object ) : any ;
    close : ( ) => any ;
    createAnswer (successCallback : (a : RTCSessionDescription ) => any , failureCallback ? : (a : string ) => any , constraints ? : Object ) : any ;
    createDataChannel (label : string , dataChannelDict ? : { reliable : boolean } ) : RTCDataChannel ;
    createOffer (successCallback : (a : RTCSessionDescription ) => any , failureCallback ? : (a : string ) => any , constraints ? : Object ) : any ;
    dispatchEvent (evt : Event ) : boolean ;
    getLocalStreams ( ) : MediaStream [] ;
    getRemoteStreams ( ) : MediaStream [] ;
    getStats (successCallback : (a : RTCStatsResponse , b ? : MediaStreamTrack ) => any , selector ? : MediaStreamTrack ) : any ;
    getStreamById (streamId : string ) : MediaStream ;
    iceConnectionState : string ;
    iceGatheringState : string ;
    localDescription : RTCSessionDescription ;
    onaddstream : (a : MediaStreamEvent ) => any ;
    ondatachannel : (a : ಠ_ಠ.clutz.PrivateType ) => any ;
    onicecandidate : (a : RTCPeerConnectionIceEvent ) => any ;
    oniceconnectionstatechange : (a : Event ) => any ;
    onnegotiationneeded : (a : Event ) => any ;
    onremovestream : (a : MediaStreamEvent ) => any ;
    onsignalingstatechange : (a : Event ) => any ;
    remoteDescription : RTCSessionDescription ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    removeStream (stream : MediaStream ) : any ;
    setLocalDescription (description : RTCSessionDescription , successCallback ? : ( ) => any , failureCallback ? : (a : string ) => any ) : any ;
    setRemoteDescription (description : RTCSessionDescription , successCallback ? : ( ) => any , failureCallback ? : (a : string ) => any ) : any ;
    signalingState : string ;
    updateIce (configuration ? : { iceServers : { url : string } [] } , constraints ? : Object ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  var webkitMediaStream : { new (a ? : MediaStream | MediaStreamTrack [] ) : MediaStream } ;
}
declare namespace ಠ_ಠ.clutz {
  var webkitRTCPeerConnection : { new (a : { iceServers : { url : string } [] } , b ? : Object ) : RTCPeerConnection } ;
}
declare namespace ಠ_ಠ.clutz {
  class MediaSource extends MediaSource_Instance {
    static isTypeSupported (type : string ) : boolean ;
  }
  class MediaSource_Instance implements EventTarget {
    private noStructuralTyping_: any;
    activeSourceBuffers : ( SourceBuffer ) [] ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    addSourceBuffer (type : string ) : SourceBuffer ;
    dispatchEvent (evt : Event ) : boolean ;
    duration : number ;
    endOfStream (opt_error ? : string ) : any ;
    readyState : string ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    removeSourceBuffer (sourceBuffer : SourceBuffer ) : any ;
    sourceBuffers : ( SourceBuffer ) [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class SourceBuffer extends SourceBuffer_Instance {
  }
  class SourceBuffer_Instance implements EventTarget {
    private noStructuralTyping_: any;
    /**
     * Abort the current segment append sequence.
     */
    abort ( ) : any ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    append (data : Uint8Array ) : any ;
    appendBuffer (data : ArrayBuffer | ArrayBufferView ) : any ;
    appendMode : string ;
    appendWindowEnd : number ;
    appendWindowStart : number ;
    buffered : TimeRanges ;
    dispatchEvent (evt : Event ) : boolean ;
    remove (start : number , end : number ) : any ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    timestampOffset : number ;
    updating : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ByteLengthQueuingStrategy extends ByteLengthQueuingStrategy_Instance {
  }
  class ByteLengthQueuingStrategy_Instance {
    private noStructuralTyping_: any;
    constructor (config : { highWaterMark : number } ) ;
    size (chunk : any ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CountQueuingStrategy extends CountQueuingStrategy_Instance {
  }
  class CountQueuingStrategy_Instance {
    private noStructuralTyping_: any;
    constructor (config : { highWaterMark : number } ) ;
    size (chunk : any ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStream extends ReadableStream_Instance {
  }
  class ReadableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : { cancel ? : (a : any ) => Promise < any > , pull ? : (a : ReadableStreamController ) => Promise < any > , start ? : (a : ReadableStreamController ) => Promise < any > } , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    cancel (reason : any ) : any ;
    getReader ( ) : ReadableStreamReader ;
    locked : boolean ;
    pipeThrough (transform : { readable : ReadableStream , writable : WritableStream } , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : ReadableStream ;
    pipeTo (dest : WritableStream , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : Promise < any > ;
    tee ( ) : ReadableStream [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStreamController extends ReadableStreamController_Instance {
  }
  class ReadableStreamController_Instance {
    private noStructuralTyping_: any;
    constructor (stream : ReadableStream ) ;
    close : ( ) => void ;
    desiredSize : number ;
    enqueue (chunk : any ) : any ;
    error (e : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStreamReader extends ReadableStreamReader_Instance {
  }
  class ReadableStreamReader_Instance {
    private noStructuralTyping_: any;
    constructor (stream : ReadableStream ) ;
    cancel (reason : any ) : any ;
    closed : boolean ;
    read ( ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WritableStream extends WritableStream_Instance {
  }
  class WritableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSink ? : { abort ? : (a : any ) => Promise < any > , close ? : ( ) => Promise < any > , start ? : (a : any ) => Promise < any > , write ? : (a : any ) => Promise < any > } , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    abort (reason : any ) : Promise < void > ;
    close : ( ) => Promise < void > ;
    closed : Promise < any > ;
    ready : Promise < any > ;
    state : string ;
    write (chunk : any ) : Promise < any > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableByteStream extends ReadableByteStream_Instance {
  }
  class ReadableByteStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : { cancel ? : (a : any ) => Promise < any > , pull ? : (a : ReadableStreamController ) => Promise < any > , start ? : (a : ReadableStreamController ) => Promise < any > } , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    cancel (reason : any ) : any ;
    getReader ( ) : ReadableByteStreamReader ;
    locked : boolean ;
    pipeThrough (transform : { readable : ReadableStream , writable : WritableStream } , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : ReadableByteStream ;
    pipeTo (dest : WritableStream , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : Promise < any > ;
    tee ( ) : ReadableByteStream [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableByteStreamController extends ReadableByteStreamController_Instance {
  }
  class ReadableByteStreamController_Instance {
    private noStructuralTyping_: any;
    constructor (stream : ReadableByteStream ) ;
    close : ( ) => void ;
    desiredSize : number ;
    error (e : any ) : any ;
    resolve (chunk : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableByteStreamReader extends ReadableByteStreamReader_Instance {
  }
  class ReadableByteStreamReader_Instance {
    private noStructuralTyping_: any;
    constructor (stream : ReadableByteStream ) ;
    cancel (reason : any ) : any ;
    closed : boolean ;
    read ( ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The GestureEvent class encapsulates information about a multi-touch gesture.
   *
   * GestureEvent objects are high-level events that encapsulate the low-level
   * TouchEvent objects. Both GestureEvent and TouchEvent events are sent during
   * a multi-touch sequence. Gesture events contain scaling and rotation
   * information allowing gestures to be combined, if supported by the platform.
   * If not supported, one gesture ends before another starts. Listen for
   * GestureEvent events if you want to respond to gestures only, not process
   * the low-level TouchEvent objects.
   */
  class GestureEvent extends GestureEvent_Instance {
  }
  class GestureEvent_Instance extends UIEvent_Instance {
    /**
     * Initializes a newly created GestureEvent object.
     */
    initGestureEvent (type : string , canBubble : boolean , cancelable : boolean , view : Window , detail : number , screenX : number , screenY : number , clientX : number , clientY : number , ctrlKey : boolean , altKey : boolean , shiftKey : boolean , metaKey : boolean , target : EventTarget , scale : number , rotation : number ) : any ;
    /**
     * The delta rotation since the start of an event, in degrees, where clockwise
     * is positive and counter-clockwise is negative. The initial value is 0.0.
     */
    rotation : number ;
    /**
     * The distance between two fingers since the start of an event as a multiplier
     * of the initial distance. The initial value is 1.0. If less than 1.0, the
     * gesture is pinch close (to zoom out). If greater than 1.0, the gesture is
     * pinch open (to zoom in).
     */
    scale : number ;
    /**
     * The target of this gesture.
     */
    target : EventTarget ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Blob extends Blob_Instance {
  }
  class Blob_Instance {
    private noStructuralTyping_: any;
    constructor (opt_blobParts ? : ( ArrayBufferView | Blob | string ) [] , opt_options ? : Object ) ;
    /**
     * This replaces Blob.slice in Firefox.
     */
    mozSlice (start : number , end : number ) : Blob ;
    size : number ;
    slice (start : number , length : number ) : Blob ;
    type : string ;
    /**
     * This replaces Blob.slice in Chrome since WebKit revision 84005.
     */
    webkitSlice (start : number , end : number ) : Blob ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class BlobBuilder extends BlobBuilder_Instance {
  }
  class BlobBuilder_Instance {
    private noStructuralTyping_: any;
    append (data : string | Blob | ArrayBuffer , endings ? : string ) : any ;
    getBlob (contentType ? : string ) : Blob ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * This has replaced BlobBuilder in Chrome since WebKit revision 84008.
   */
  class WebKitBlobBuilder extends WebKitBlobBuilder_Instance {
  }
  class WebKitBlobBuilder_Instance {
    private noStructuralTyping_: any;
    append (data : string | Blob | ArrayBuffer , endings ? : string ) : any ;
    getBlob (contentType ? : string ) : Blob ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DirectoryEntry extends DirectoryEntry_Instance {
  }
  class DirectoryEntry_Instance extends Entry_Instance {
    createReader ( ) : DirectoryReader ;
    getDirectory (path : string , options ? : Object , successCallback ? : (a : DirectoryEntry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    getFile (path : string , options ? : Object , successCallback ? : (a : FileEntry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    removeRecursively (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DirectoryReader extends DirectoryReader_Instance {
  }
  class DirectoryReader_Instance {
    private noStructuralTyping_: any;
    readEntries (successCallback : (a : Entry [] ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Entry extends Entry_Instance {
  }
  class Entry_Instance {
    private noStructuralTyping_: any;
    copyTo (parent : DirectoryEntry , newName ? : string , successCallback ? : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    filesystem : FileSystem ;
    fullPath : string ;
    getMetadata (successCallback : (a : Metadata ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    getParent (successCallback : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    isDirectory : boolean ;
    isFile : boolean ;
    moveTo (parent : DirectoryEntry , newName ? : string , successCallback ? : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    name : string ;
    remove (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    toURL (mimeType ? : string ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class File extends File_Instance {
  }
  class File_Instance extends Blob_Instance {
    constructor (opt_contents ? : ( string | Blob | ArrayBuffer ) [] , opt_name ? : string , opt_properties ? : { lastModified ? : number , type ? : string } ) ;
    /**
     * Chrome uses this instead of name.
     */
    fileName : string ;
    /**
     * Chrome uses this instead of size.
     */
    fileSize : string ;
    lastModified : number ;
    lastModifiedDate : Date ;
    name : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileEntry extends FileEntry_Instance {
  }
  class FileEntry_Instance extends Entry_Instance {
    createWriter (successCallback : (a : FileWriter ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
    file (successCallback : (a : File ) => any , errorCallback ? : (a : FileError ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileError extends FileError_Instance {
    static ABORT_ERR : number ;
    static ENCODING_ERR : number ;
    static INVALID_MODIFICATION_ERR : number ;
    static INVALID_STATE_ERR : number ;
    static NOT_FOUND_ERR : number ;
    static NOT_READABLE_ERR : number ;
    static NO_MODIFICATION_ALLOWED_ERR : number ;
    static PATH_EXISTS_ERR : number ;
    static QUOTA_EXCEEDED_ERR : number ;
    static SECURITY_ERR : number ;
    static SYNTAX_ERR : number ;
    static TYPE_MISMATCH_ERR : number ;
  }
  class FileError_Instance extends DOMError_Instance {
    ABORT_ERR : number ;
    ENCODING_ERR : number ;
    INVALID_MODIFICATION_ERR : number ;
    INVALID_STATE_ERR : number ;
    NOT_FOUND_ERR : number ;
    NOT_READABLE_ERR : number ;
    NO_MODIFICATION_ALLOWED_ERR : number ;
    PATH_EXISTS_ERR : number ;
    QUOTA_EXCEEDED_ERR : number ;
    SECURITY_ERR : number ;
    SYNTAX_ERR : number ;
    TYPE_MISMATCH_ERR : number ;
    code : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileReader extends FileReader_Instance {
  }
  class FileReader_Instance implements EventTarget {
    private noStructuralTyping_: any;
    DONE : number ;
    EMPTY : number ;
    LOADING : number ;
    abort ( ) : any ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    error : FileError ;
    onabort : (a : ProgressEvent ) => any ;
    onerror : (a : ProgressEvent ) => any ;
    onload : (a : ProgressEvent ) => any ;
    onloadend : (a : ProgressEvent ) => any ;
    onloadstart : (a : ProgressEvent ) => any ;
    onprogress : (a : ProgressEvent ) => any ;
    readAsArrayBuffer (blob : Blob ) : any ;
    readAsBinaryString (blob : Blob ) : any ;
    readAsDataURL (blob : Blob ) : any ;
    readAsText (blob : Blob , encoding ? : string ) : any ;
    readyState : number ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    result : string | Blob | ArrayBuffer ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileSaver extends FileSaver_Instance {
  }
  class FileSaver_Instance {
    private noStructuralTyping_: any;
    DONE : number ;
    INIT : number ;
    WRITING : number ;
    abort ( ) : any ;
    error : FileError ;
    onabort : (a : ProgressEvent ) => any ;
    onerror : (a : ProgressEvent ) => any ;
    onprogress : (a : ProgressEvent ) => any ;
    onwrite : (a : ProgressEvent ) => any ;
    onwriteend : (a : ProgressEvent ) => any ;
    onwritestart : (a : ProgressEvent ) => any ;
    readyState : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileSystem extends FileSystem_Instance {
  }
  class FileSystem_Instance {
    private noStructuralTyping_: any;
    name : string ;
    root : DirectoryEntry ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileWriter extends FileWriter_Instance {
  }
  class FileWriter_Instance extends FileSaver_Instance {
    length : number ;
    position : number ;
    seek (offset : number ) : any ;
    truncate (size : number ) : any ;
    write (blob : Blob ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * LocalFileSystem interface, implemented by Window and WorkerGlobalScope.
   */
  class LocalFileSystem extends LocalFileSystem_Instance {
  }
  class LocalFileSystem_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Metadata interface.
   */
  class Metadata extends Metadata_Instance {
  }
  class Metadata_Instance {
    private noStructuralTyping_: any;
    modificationTime : Date ;
    size : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * This has been replaced by URL in Chrome since WebKit revision 75739.
   */
  class webkitURL extends webkitURL_Instance {
    static createObjectURL (obj : Object ) : string ;
    static revokeObjectURL (url : string ) : any ;
  }
  class webkitURL_Instance {
    private noStructuralTyping_: any;
    /**
     * This has been replaced by URL in Chrome since WebKit revision 75739.
     */
    constructor (urlString : string , opt_base ? : string ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StorageInfo extends StorageInfo_Instance {
  }
  class StorageInfo_Instance {
    private noStructuralTyping_: any;
    PERSISTENT : number ;
    TEMPORARY : number ;
    queryUsageAndQuota (type : number , successCallback : (a : number , b : number ) => any , errorCallback ? : (a : DOMException ) => any ) : any ;
    requestQuota (type : number , size : number , successCallback : (a : number ) => any , errorCallback ? : (a : DOMException ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StorageQuota extends StorageQuota_Instance {
  }
  class StorageQuota_Instance {
    private noStructuralTyping_: any;
    queryUsageAndQuota (successCallback : (a : number , b : number ) => any , opt_errorCallback ? : (a : DOMException ) => any ) : any ;
    requestQuota (size : number , opt_successCallback ? : (a : number ) => any , opt_errorCallback ? : (a : DOMException ) => any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class URLSearchParams extends URLSearchParams_Instance {
  }
  class URLSearchParams_Instance {
    private noStructuralTyping_: any;
    constructor (init ? : string | URLSearchParams ) ;
    append (name : string , value : string ) : any ;
    delete (name : string ) : any ;
    get (name : string ) : string ;
    getAll (name : string ) : string [] ;
    has (name : string ) : boolean ;
    set (name : string , value : string ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class URL extends URL_Instance {
    static createObjectURL (obj : Blob | MediaSource | MediaStream ) : string ;
    static domainToASCII (domain : string ) : string ;
    static domainToUnicode (domain : string ) : string ;
    static revokeObjectURL (url : string ) : any ;
  }
  class URL_Instance {
    private noStructuralTyping_: any;
    constructor (url : string , base ? : string ) ;
    hash : string ;
    host : string ;
    hostname : string ;
    href : string ;
    origin : string ;
    password : string ;
    pathname : string ;
    port : string ;
    protocol : string ;
    search : string ;
    searchParams : URLSearchParams ;
    username : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XPathException extends XPathException_Instance {
    static INVALID_EXPRESSION_ERR : number ;
    static TYPE_ERR : number ;
  }
  class XPathException_Instance {
    private noStructuralTyping_: any;
    code : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XPathEvaluator extends XPathEvaluator_Instance {
  }
  class XPathEvaluator_Instance {
    private noStructuralTyping_: any;
    createExpression (expr : string , opt_resolver ? : XPathNSResolver ) : any ;
    createNSResolver (nodeResolver : Node ) : any ;
    evaluate (expr : string , contextNode : Node , opt_resolver ? : XPathNSResolver , opt_type ? : number , opt_result ? : any ) : XPathResult ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XPathExpression extends XPathExpression_Instance {
  }
  class XPathExpression_Instance {
    private noStructuralTyping_: any;
    evaluate (contextNode : Node , opt_type ? : number , opt_result ? : any ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XPathNSResolver extends XPathNSResolver_Instance {
  }
  class XPathNSResolver_Instance {
    private noStructuralTyping_: any;
    lookupNamespaceURI (prefix : string ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * From http://www.w3.org/TR/xpath
   *
   * XPath is a language for addressing parts of an XML document, designed to be
   * used by both XSLT and XPointer.
   */
  class XPathResult extends XPathResult_Instance {
    static ANY_TYPE : number ;
    static ANY_UNORDERED_NODE_TYPE : number ;
    static BOOLEAN_TYPE : number ;
    static FIRST_ORDERED_NODE_TYPE : number ;
    static NUMBER_TYPE : number ;
    static ORDERED_NODE_ITERATOR_TYPE : number ;
    static ORDERED_NODE_SNAPSHOT_TYPE : number ;
    static STRING_TYPE : number ;
    static UNORDERED_NODE_ITERATOR_TYPE : number ;
    static UNORDERED_NODE_SNAPSHOT_TYPE : number ;
  }
  class XPathResult_Instance {
    private noStructuralTyping_: any;
    booleanValue : boolean ;
    invalidInteratorState : boolean ;
    iterateNext ( ) : Node ;
    numberValue : number ;
    resultType : number ;
    singleNodeValue : Node ;
    snapshotItem (index : number ) : Node ;
    snapshotLength : number ;
    stringValue : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class XPathNamespace extends XPathNamespace_Instance {
    static XPATH_NAMESPACE_NODE : number ;
  }
  class XPathNamespace_Instance extends Node_Instance {
    ownerElement : Element ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * From http://www.w3.org/TR/XMLHttpRequest/
   *
   * (Draft)
   *
   * The XMLHttpRequest Object specification defines an API that provides
   * scripted client functionality for transferring data between a client and a
   * server.
   */
  class XMLHttpRequest extends XMLHttpRequest_Instance {
  }
  class XMLHttpRequest_Instance implements EventTarget {
    private noStructuralTyping_: any;
    abort ( ) : void ;
    addEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    dispatchEvent (evt : Event ) : boolean ;
    getAllResponseHeaders ( ) : string ;
    getResponseHeader (header : string ) : string ;
    mozResponseArrayBuffer : ArrayBuffer ;
    onerror : ( ...a : any [] ) => any ;
    onprogress : (a : ProgressEvent ) => void ;
    onreadystatechange : ( ...a : any [] ) => any ;
    open : (method : string , url : string , opt_async ? : boolean , opt_user ? : string , opt_password ? : string ) => void ;
    overrideMimeType (mimeType : string ) : any ;
    readyState : number ;
    removeEventListener (type : string , listener : EventListener | ( (a : Event ) => boolean ) , opt_useCapture ? : boolean ) : void ;
    response : any ;
    responseText : string ;
    responseType : string ;
    responseXML : Document ;
    send (opt_data ? : ArrayBuffer | ArrayBufferView | Blob | Document | FormData | string ) : void ;
    setRequestHeader (header : string , value : string ) : void ;
    status : number ;
    statusText : string ;
    upload : XMLHttpRequestUpload ;
    withCredentials : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The FormData object represents an ordered collection of entries. Each entry
   * has a name and value.
   */
  class FormData extends FormData_Instance {
  }
  class FormData_Instance {
    private noStructuralTyping_: any;
    /**
     * The FormData object represents an ordered collection of entries. Each entry
     * has a name and value.
     * @param opt_form An optional form to use for constructing the form data set.
     */
    constructor (opt_form ? : Element ) ;
    append (name : string , value : Blob | string , opt_filename ? : string ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Geolocation extends Geolocation_Instance {
  }
  class Geolocation_Instance {
    private noStructuralTyping_: any;
    clearWatch (watchId : number ) : any ;
    getCurrentPosition (successCallback : (a : GeolocationPosition ) => any , opt_errorCallback ? : (a : GeolocationPositionError ) => any , opt_options ? : GeolocationPositionOptions ) : any ;
    watchPosition (successCallback : (a : GeolocationPosition ) => any , opt_errorCallback ? : (a : GeolocationPositionError ) => any , opt_options ? : GeolocationPositionOptions ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class GeolocationCoordinates extends GeolocationCoordinates_Instance {
  }
  class GeolocationCoordinates_Instance {
    private noStructuralTyping_: any;
    accuracy : number ;
    altitude : number ;
    altitudeAccuracy : number ;
    heading : number ;
    latitude : number ;
    longitude : number ;
    speed : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class GeolocationPosition extends GeolocationPosition_Instance {
  }
  class GeolocationPosition_Instance {
    private noStructuralTyping_: any;
    coords : GeolocationCoordinates ;
    timestamp : Date ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class GeolocationPositionOptions extends GeolocationPositionOptions_Instance {
  }
  class GeolocationPositionOptions_Instance {
    private noStructuralTyping_: any;
    enableHighAccuracy : boolean ;
    maximumAge : number ;
    timeout : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class GeolocationPositionError extends GeolocationPositionError_Instance {
  }
  class GeolocationPositionError_Instance {
    private noStructuralTyping_: any;
    PERMISSION_DENIED : number ;
    POSITION_UNAVAILABLE : number ;
    TIMEOUT : number ;
    UNKNOWN_ERROR : number ;
    code : number ;
    message : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Storage {
    clear ( ) : void ;
    getItem (key : string ) : string ;
    key (index : number ) : string ;
    length : number ;
    removeItem (key : string ) : void ;
    setItem (key : string , data : string ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WindowSessionStorage {
    sessionStorage : Storage ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WindowLocalStorage {
    localStorage : Storage ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * This is the storage event interface.
   */
  class StorageEvent extends StorageEvent_Instance {
  }
  class StorageEvent_Instance extends Event_Instance {
    initStorageEvent (typeArg : string , canBubbleArg : boolean , cancelableArg : boolean , keyArg : string , oldValueArg : string , newValueArg : string , urlArg : string , storageAreaArg : Storage ) : void ;
    key : string ;
    newValue : string ;
    oldValue : string ;
    storageArea : Storage ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Range extends Range_Instance {
  }
  class Range_Instance {
    private noStructuralTyping_: any;
    END_TO_END : number ;
    END_TO_START : number ;
    START_TO_END : number ;
    START_TO_START : number ;
    cloneContents ( ) : DocumentFragment ;
    cloneRange ( ) : Range ;
    collapse (toStart : boolean ) : void ;
    collapsed : boolean ;
    commonAncestorContainer : Node ;
    compareBoundaryPoints (how : number , sourceRange : Range ) : number ;
    compareNode (a : Node ) : number ;
    comparePoint (a : Node , b : number ) : number ;
    createContextualFragment (a : string ) : DocumentFragment ;
    deleteContents ( ) : number ;
    detach ( ) : void ;
    endContainer : Node ;
    endOffset : number ;
    extractContents ( ) : DocumentFragment ;
    getBoundingClientRect ( ) : ClientRect ;
    getClientRects ( ) : ClientRectList ;
    insertNode (newNode : Node ) : DocumentFragment ;
    intersectsNode (a : Node ) : boolean ;
    isPointInRange (a : Node , b : number ) : boolean ;
    selectNode (refNode : Node ) : void ;
    selectNodeContents (refNode : Node ) : void ;
    setEnd (refNode : Node , offset : number ) : void ;
    setEndAfter (refNode : Node ) : void ;
    setEndBefore (refNode : Node ) : void ;
    setStart (refNode : Node , offset : number ) : void ;
    setStartAfter (refNode : Node ) : void ;
    setStartBefore (refNode : Node ) : void ;
    startContainer : Node ;
    startOffset : number ;
    surroundContents (newParent : Node ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DocumentRange extends DocumentRange_Instance {
  }
  class DocumentRange_Instance {
    private noStructuralTyping_: any;
    createRange ( ) : Range ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RangeException extends RangeException_Instance {
  }
  class RangeException_Instance {
    private noStructuralTyping_: any;
    BAD_BOUNDARYPOINTS_ERR : number ;
    INVALID_NODE_TYPE_ERR : number ;
    code : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioContext extends AudioContext_Instance {
  }
  class AudioContext_Instance {
    private noStructuralTyping_: any;
    createAnalyser ( ) : RealtimeAnalyserNode ;
    createBiquadFilter ( ) : BiquadFilterNode ;
    createBuffer (numberOfChannels : number , length : number , sampleRate : number ) : AudioBuffer ;
    createBufferSource ( ) : AudioBufferSourceNode ;
    createChannelMerger (numberOfInputs ? : number ) : AudioChannelMerger ;
    createChannelSplitter (numberOfOutputs ? : number ) : AudioChannelSplitter ;
    createConvolver ( ) : ConvolverNode ;
    createDelay (maxDelayTime ? : number ) : DelayNode ;
    /**
     * To be deprecated. Use createDelay instead.
     */
    createDelayNode (maxDelayTime ? : number ) : DelayNode ;
    createDynamicsCompressor ( ) : DynamicsCompressorNode ;
    createGain ( ) : GainNode ;
    createGainNode ( ) : GainNode ;
    /**
     * To be deprecated. Use createScriptProcessor instead.
     */
    createJavaScriptNode (bufferSize : number , numberOfInputs : number , numberOfOuputs : number ) : ScriptProcessorNode ;
    createMediaElementSource (mediaElement : HTMLMediaElement ) : MediaElementAudioSourceNode ;
    createMediaStreamDestination ( ) : MediaStreamAudioDestinationNode ;
    createMediaStreamSource (mediaStream : MediaStream ) : MediaStreamAudioSourceNode ;
    createOscillator ( ) : OscillatorNode ;
    createPanner ( ) : AudioPannerNode ;
    createPeriodicWave (real : Float32Array , imag : Float32Array ) : PeriodicWave ;
    createScriptProcessor (bufferSize : number , numberOfInputChannels_opt ? : number , numberOfOutputChannels_opt ? : number ) : ScriptProcessorNode ;
    createStereoPanner ( ) : StereoPannerNode ;
    createWaveShaper ( ) : WaveShaperNode ;
    currentTime : number ;
    decodeAudioData (audioData : ArrayBuffer , successCallback : (a : AudioBuffer ) => any , errorCallback ? : (a : any ) => any ) : any ;
    destination : AudioDestinationNode ;
    listener : AudioListener ;
    sampleRate : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OfflineAudioContext extends OfflineAudioContext_Instance {
  }
  class OfflineAudioContext_Instance extends AudioContext_Instance {
    constructor (numberOfChannels : number , length : number , sampleRate : number ) ;
    oncomplete (a : OfflineAudioCompletionEvent ) : any ;
    startRendering ( ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OfflineAudioCompletionEvent extends OfflineAudioCompletionEvent_Instance {
  }
  class OfflineAudioCompletionEvent_Instance extends Event_Instance {
    renderedBuffer : AudioBuffer ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioNode extends AudioNode_Instance {
  }
  class AudioNode_Instance {
    private noStructuralTyping_: any;
    channelCount : number ;
    channelCountMode : string ;
    channelInterpretation : string ;
    connect (destination : AudioNode , output ? : number , input ? : number ) : any ;
    context : AudioContext ;
    disconnect (output ? : number ) : any ;
    numberOfInputs : number ;
    numberOfOutputs : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioSourceNode extends AudioSourceNode_Instance {
  }
  class AudioSourceNode_Instance extends AudioNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioDestinationNode extends AudioDestinationNode_Instance {
  }
  class AudioDestinationNode_Instance extends AudioNode_Instance {
    maxChannelCount : number ;
    /**
     * To be deprecated. Use maxChannelCount instead.
     */
    numberOfChannels : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioParam extends AudioParam_Instance {
  }
  class AudioParam_Instance {
    private noStructuralTyping_: any;
    cancelScheduledValues (startTime : number ) : any ;
    defaultValue : number ;
    exponentialRampToValueAtTime (value : number , endTime : number ) : any ;
    linearRampToValueAtTime (value : number , endTime : number ) : any ;
    /**
     * To be deprecated.
     */
    maxValue : number ;
    /**
     * To be deprecated.
     */
    minValue : number ;
    setTargetAtTime (target : number , startTime : number , timeConstant : number ) : any ;
    setTargetValueAtTime (target : number , startTime : number , timeConstant : number ) : any ;
    setValueAtTime (value : number , startTime : number ) : any ;
    setValueCurveAtTime (values : Float32Array , startTime : number , duration : number ) : any ;
    /**
     * To be deprecated.
     */
    units : number ;
    value : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioGain extends AudioGain_Instance {
  }
  class AudioGain_Instance extends AudioParam_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class GainNode extends GainNode_Instance {
  }
  class GainNode_Instance extends AudioNode_Instance {
    gain : AudioGain ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DelayNode extends DelayNode_Instance {
  }
  class DelayNode_Instance extends AudioNode_Instance {
    delayTime : AudioParam ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioBuffer extends AudioBuffer_Instance {
  }
  class AudioBuffer_Instance {
    private noStructuralTyping_: any;
    duration : number ;
    /**
     * To be deprecated.
     */
    gain : AudioGain ;
    getChannelData (channel : number ) : Float32Array ;
    length : number ;
    numberOfChannels : number ;
    sampleRate : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioBufferSourceNode extends AudioBufferSourceNode_Instance {
  }
  class AudioBufferSourceNode_Instance extends AudioSourceNode_Instance {
    /**
     * To be deprecated.
     */
    FINISHED_STATE : number ;
    /**
     * To be deprecated.
     */
    PLAYING_STATE : number ;
    /**
     * To be deprecated.
     */
    SCHEDULED_STATE : number ;
    /**
     * To be deprecated.
     */
    UNSCHEDULED_STATE : number ;
    buffer : AudioBuffer ;
    /**
     * To be deprecated.
     */
    gain : number ;
    loop : boolean ;
    loopEnd : number ;
    loopStart : number ;
    /**
     * To be deprecated.
     */
    noteGrainOn (when : number , grainOffset : number , grainDuration : number ) : any ;
    /**
     * To be deprecated.
     */
    noteOff (when : number ) : any ;
    /**
     * To be deprecated.
     */
    noteOn (when : number ) : any ;
    playbackRate : AudioParam ;
    /**
     * To be deprecated.
     */
    playbackState : number ;
    start (when : number , opt_offset ? : number , opt_duration ? : number ) : any ;
    stop (when : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaElementAudioSourceNode extends MediaElementAudioSourceNode_Instance {
  }
  class MediaElementAudioSourceNode_Instance extends AudioSourceNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * To be deprecated. Use ScriptProcessorNode instead.
   */
  class JavaScriptAudioNode extends JavaScriptAudioNode_Instance {
  }
  class JavaScriptAudioNode_Instance extends AudioNode_Instance {
    bufferSize : number ;
    onaudioprocess : EventListener | ( (a : AudioProcessingEvent ) => boolean ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ScriptProcessorNode extends ScriptProcessorNode_Instance {
  }
  class ScriptProcessorNode_Instance extends AudioNode_Instance {
    bufferSize : number ;
    onaudioprocess : EventListener | ( (a : AudioProcessingEvent ) => boolean ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioProcessingEvent extends AudioProcessingEvent_Instance {
  }
  class AudioProcessingEvent_Instance extends Event_Instance {
    inputBuffer : AudioBuffer ;
    node : ScriptProcessorNode ;
    outputBuffer : AudioBuffer ;
    playbackTime : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioPannerNode extends AudioPannerNode_Instance {
  }
  class AudioPannerNode_Instance extends AudioNode_Instance {
    /**
     * To be deprecated. Use 'equalpower' instead.
     */
    EQUALPOWER : number ;
    /**
     * To be deprecated. Use 'exponential' instead.
     */
    EXPONENTIAL_DISTANCE : number ;
    /**
     * To be deprecated. Use 'HRTF' instead.
     */
    HRTF : number ;
    /**
     * To be deprecated. Use 'inverse' instead.
     */
    INVERSE_DISTANCE : number ;
    /**
     * To be deprecated. Use 'linear' instead.
     */
    LINEAR_DISTANCE : number ;
    /**
     * To be deprecated.
     */
    SOUNDFIELD : number ;
    /**
     * To be deprecated.
     */
    coneGain : AudioGain ;
    coneInnerAngle : number ;
    coneOuterAngle : number ;
    coneOuterGain : number ;
    /**
     * To be deprecated.
     */
    distanceGain : AudioGain ;
    distanceModel : number | string ;
    maxDistance : number ;
    panningModel : number | string ;
    refDistance : number ;
    rolloffFactor : number ;
    setOrientation (x : number , y : number , z : number ) : any ;
    setPosition (x : number , y : number , z : number ) : any ;
    setVelocity (x : number , y : number , z : number ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StereoPannerNode extends StereoPannerNode_Instance {
  }
  class StereoPannerNode_Instance extends AudioNode_Instance {
    pan : AudioParam ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioListener extends AudioListener_Instance {
  }
  class AudioListener_Instance {
    private noStructuralTyping_: any;
    dopplerFactor : number ;
    /**
     * To be deprecated.
     */
    gain : number ;
    setOrientation (x : number , y : number , z : number , xUp : number , yUp : number , zUp : number ) : any ;
    setPosition (x : number , y : number , z : number ) : any ;
    setVelocity (x : number , y : number , z : number ) : any ;
    speedOfSound : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ConvolverNode extends ConvolverNode_Instance {
  }
  class ConvolverNode_Instance extends AudioNode_Instance {
    buffer : AudioBuffer ;
    normalize : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class RealtimeAnalyserNode extends RealtimeAnalyserNode_Instance {
  }
  class RealtimeAnalyserNode_Instance extends AudioNode_Instance {
    fftSize : number ;
    frequencyBinCount : number ;
    getByteFrequencyData (array : Uint8Array ) : any ;
    getByteTimeDomainData (array : Uint8Array ) : any ;
    getFloatFrequencyData (array : Float32Array ) : any ;
    maxDecibels : number ;
    minDecibels : number ;
    smoothingTimeConstant : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioChannelSplitter extends AudioChannelSplitter_Instance {
  }
  class AudioChannelSplitter_Instance extends AudioNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class AudioChannelMerger extends AudioChannelMerger_Instance {
  }
  class AudioChannelMerger_Instance extends AudioNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class DynamicsCompressorNode extends DynamicsCompressorNode_Instance {
  }
  class DynamicsCompressorNode_Instance extends AudioNode_Instance {
    attack : AudioParam ;
    knee : AudioParam ;
    ratio : AudioParam ;
    reduction : AudioParam ;
    release : AudioParam ;
    threshold : AudioParam ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class BiquadFilterNode extends BiquadFilterNode_Instance {
  }
  class BiquadFilterNode_Instance extends AudioNode_Instance {
    Q : AudioParam ;
    detune : AudioParam ;
    frequency : AudioParam ;
    gain : AudioParam ;
    getFrequencyResponse (frequencyHz : Float32Array , magResponse : Float32Array , phaseResponse : Float32Array ) : any ;
    /**
     * A read-able and write-able string that specifies the type of the filter.
     * See http://webaudio.github.io/web-audio-api/#the-biquadfilternode-interface
     * for valid values.
     */
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WaveShaperNode extends WaveShaperNode_Instance {
  }
  class WaveShaperNode_Instance extends AudioNode_Instance {
    curve : Float32Array ;
    oversample : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WaveTable extends WaveTable_Instance {
  }
  class WaveTable_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class PeriodicWave extends PeriodicWave_Instance {
  }
  class PeriodicWave_Instance {
    private noStructuralTyping_: any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class OscillatorNode extends OscillatorNode_Instance {
  }
  class OscillatorNode_Instance extends AudioNode_Instance {
    detune : AudioParam ;
    frequency : AudioParam ;
    onended : EventListener ;
    /**
     * To be deprecated.
     */
    playbackState : number ;
    setPeriodicWave (a : PeriodicWave ) : any ;
    /**
     * To be deprecated.
     */
    setWaveTable (a : WaveTable ) : any ;
    start (a : number ) : any ;
    stop (a : number ) : any ;
    type : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaStreamAudioSourceNode extends MediaStreamAudioSourceNode_Instance {
  }
  class MediaStreamAudioSourceNode_Instance extends AudioSourceNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class MediaStreamAudioDestinationNode extends MediaStreamAudioDestinationNode_Instance {
  }
  class MediaStreamAudioDestinationNode_Instance extends AudioDestinationNode_Instance {
    stream : MediaStream ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitAudioContext extends webkitAudioContext_Instance {
  }
  class webkitAudioContext_Instance extends AudioContext_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitOfflineAudioContext extends webkitOfflineAudioContext_Instance {
  }
  class webkitOfflineAudioContext_Instance extends OfflineAudioContext_Instance {
    constructor (numberOfChannels : number , length : number , sampleRate : number ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class webkitAudioPannerNode extends webkitAudioPannerNode_Instance {
  }
  class webkitAudioPannerNode_Instance extends AudioPannerNode_Instance {
  }
}
declare namespace ಠ_ಠ.clutz {
  class Audio extends Audio_Instance {
  }
  class Audio_Instance extends HTMLAudioElement_Instance {
    constructor (src ? : string ) ;
    mozCurrentSampleOffset ( ) : number ;
    mozSetup (channels : number , rate : number ) : any ;
    mozWriteAudio (buffer : any [] | Float32Array ) : any ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Stack frame elements in V8.
   */
  class CallSite extends CallSite_Instance {
  }
  class CallSite_Instance {
    private noStructuralTyping_: any;
    /**
     * If this function was defined in a script returns the current column number.
     */
    getColumnNumber ( ) : number ;
    /**
     * If this function was created using a call to eval, returns a CallSite object
     * representing the location where eval was called
     */
    getEvalOrigin ( ) : CallSite ;
    /**
     * If this function was defined in a script returns the name of the script
     */
    getFileName ( ) : string ;
    /**
     * Returns the current function.
     */
    getFunction ( ) : ( ...a : any [] ) => any ;
    /**
     * Returns the name of the current function, typically its name property. If a
     * name property is not available an attempt will be made to try to infer a name
     * from the function's context.
     */
    getFunctionName ( ) : string ;
    /**
     * If this function was defined in a script returns the current line number.
     */
    getLineNumber ( ) : number ;
    /**
     * Returns the name of the property of this or one of its prototypes that holds
     * the current function.
     */
    getMethodName ( ) : string ;
    /**
     * Returns the value of this.
     */
    getThis ( ) : Object ;
    /**
     * Returns the type of this as a string. This is the name of the function stored
     * in the constructor field of this, if available, otherwise the object's
     * [[Class]] internal property.
     */
    getTypeName ( ) : string ;
    /**
     * Is this a constructor call?
     */
    isConstructor ( ) : boolean ;
    /**
     * Does this call take place in code defined by a call to eval?
     */
    isEval ( ) : boolean ;
    /**
     * Is this call in native V8 code?
     */
    isNative ( ) : boolean ;
    /**
     * Is this a toplevel invocation, that is, is this the global object?
     */
    isToplevel ( ) : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextDecoder extends TextDecoder_Instance {
  }
  class TextDecoder_Instance {
    private noStructuralTyping_: any;
    constructor (encoding ? : string , options ? : Object ) ;
    decode (input : Uint8Array , options ? : Object ) : string ;
    encoding : string ;
    fatal : boolean ;
    ignoreBOM : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TextEncoder extends TextEncoder_Instance {
  }
  class TextEncoder_Instance {
    private noStructuralTyping_: any;
    constructor (encoding ? : string , options ? : Object ) ;
    encode (input : string ) : Uint8Array ;
    encoding : string ;
  }
}
