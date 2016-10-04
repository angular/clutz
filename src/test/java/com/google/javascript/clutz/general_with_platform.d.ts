declare namespace ಠ_ಠ.clutz {
  interface Body {
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    bodyUsed : boolean ;
    formData ( ) : Promise < FormData > ;
    json ( ) : Promise < any > ;
    text ( ) : Promise < string > ;
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
  /**
   * Event whose listeners take a boolean parameter.
   */
  class ChromeBooleanEvent extends ChromeBooleanEvent_Instance {
  }
  class ChromeBooleanEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : (a : boolean ) => undefined ) : void ;
    hasListener (callback : (a : boolean ) => undefined ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : boolean ) => undefined ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ChromeEvent extends ChromeEvent_Instance {
  }
  class ChromeEvent_Instance {
    private noStructuralTyping_: any;
    addListener (callback : Function ) : void ;
    hasListener (callback : Function ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : Function ) : void ;
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
    addListener (callback : (a : Object ) => undefined ) : void ;
    hasListener (callback : (a : Object ) => undefined ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : Object ) => undefined ) : void ;
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
    addListener (callback : (a : string [] ) => undefined ) : void ;
    hasListener (callback : (a : string [] ) => undefined ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string [] ) => undefined ) : void ;
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
    addListener (callback : (a : string ) => undefined ) : void ;
    hasListener (callback : (a : string ) => undefined ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string ) => undefined ) : void ;
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
    addListener (callback : (a : string , b : string ) => undefined ) : void ;
    hasListener (callback : (a : string , b : string ) => undefined ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string , b : string ) => undefined ) : void ;
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
  class DirectoryEntry extends DirectoryEntry_Instance {
  }
  class DirectoryEntry_Instance extends Entry_Instance {
    createReader ( ) : DirectoryReader ;
    getDirectory (path : string , options ? : Object | null , successCallback ? : (a : DirectoryEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    getFile (path : string , options ? : Object | null , successCallback ? : (a : FileEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    removeRecursively (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DirectoryReader extends DirectoryReader_Instance {
  }
  class DirectoryReader_Instance {
    private noStructuralTyping_: any;
    readEntries (successCallback : (a : Entry [] ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Entry extends Entry_Instance {
  }
  class Entry_Instance {
    private noStructuralTyping_: any;
    copyTo (parent : DirectoryEntry , newName ? : string , successCallback ? : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    filesystem : FileSystem ;
    fullPath : string ;
    getMetadata (successCallback : (a : Metadata ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    getParent (successCallback : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    isDirectory : boolean ;
    isFile : boolean ;
    moveTo (parent : DirectoryEntry , newName ? : string , successCallback ? : (a : Entry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    name : string ;
    remove (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    toURL (mimeType ? : string ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type FetchRequestType = string ;
  var FetchRequestType : {
    AUDIO : FetchRequestType ,
    FONT : FetchRequestType ,
    IMAGE : FetchRequestType ,
    NONE : FetchRequestType ,
    SCRIPT : FetchRequestType ,
    STYLE : FetchRequestType ,
    TRACK : FetchRequestType ,
    VIDEO : FetchRequestType ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class FileEntry extends FileEntry_Instance {
  }
  class FileEntry_Instance extends Entry_Instance {
    createWriter (successCallback : (a : FileWriter ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    file (successCallback : (a : File ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
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
  class FileError_Instance extends DOMError {
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
  class FileSaver extends FileSaver_Instance {
  }
  class FileSaver_Instance {
    private noStructuralTyping_: any;
    DONE : number ;
    INIT : number ;
    WRITING : number ;
    abort ( ) : void ;
    error : FileError | null ;
    onabort : ( (a : ProgressEvent ) => any ) | null ;
    onerror : ( (a : ProgressEvent ) => any ) | null ;
    onprogress : ( (a : ProgressEvent ) => any ) | null ;
    onwrite : ( (a : ProgressEvent ) => any ) | null ;
    onwriteend : ( (a : ProgressEvent ) => any ) | null ;
    onwritestart : ( (a : ProgressEvent ) => any ) | null ;
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
    seek (offset : number ) : void ;
    truncate (size : number ) : void ;
    write (blob : Blob ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Headers extends Headers_Instance {
  }
  class Headers_Instance implements Iterable < string [] > {
    private noStructuralTyping_: any;
    constructor (opt_headersInit ? : Headers | string [] [] | IObject < string , string > ) ;
    append (name : string , value : string ) : void ;
    delete (name : string ) : void ;
    entries ( ) : Iterator < string [] > ;
    get (name : string ) : string | null ;
    getAll (name : string ) : string [] ;
    has (name : string ) : boolean ;
    keys ( ) : Iterator < string > ;
    set (name : string , value : string ) : void ;
    values ( ) : Iterator < string > ;
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
  class Image extends Image_Instance {
  }
  class Image_Instance extends HTMLImageElement {
    constructor (opt_width ? : number , opt_height ? : number ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Iterable < VALUE > {
  }
}
declare namespace ಠ_ಠ.clutz {
  class MessageSender extends MessageSender_Instance {
  }
  class MessageSender_Instance {
    private noStructuralTyping_: any;
    frameId ? : number ;
    id ? : string ;
    tab ? : Tab ;
    tlsChannelId ? : string ;
    url ? : string ;
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
  class Port extends Port_Instance {
  }
  class Port_Instance {
    private noStructuralTyping_: any;
    disconnect ( ) : void ;
    name : string ;
    onDisconnect : ChromeEvent ;
    onMessage : ChromeEvent ;
    postMessage (obj : any ) : void ;
    sender ? : MessageSender ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Promise < TYPE > extends Promise_Instance < TYPE > {
    static all(promises : Promise < any > [] ) : Promise < any [] > ;
    static race < T > (values : T [] ) : Promise < T > ;
    static reject (opt_error ? : any ) : Promise < any > ;
    static resolve < T >(value: Promise < T > | T): Promise < T >;
  }
  class Promise_Instance < TYPE > implements PromiseLike < TYPE > {
    private noStructuralTyping_: any;
    constructor (resolver : (a : (a ? : TYPE | PromiseLike < TYPE > | null | { then : any } ) => any , b : (a ? : any ) => any ) => any ) ;
    catch < RESULT > (onRejected : (a : any ) => RESULT ) : Promise < RESULT > ;
    then < RESULT > (opt_onFulfilled ? : ( (a : TYPE ) => Promise < RESULT > | RESULT ) | null , opt_onRejected ? : ( (a : any ) => any ) | null) : Promise < RESULT > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableByteStream extends ReadableByteStream_Instance {
  }
  class ReadableByteStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : { cancel ? : (a : any ) => Promise < any > | undefined , pull ? : (a : ReadableStreamController ) => Promise < any > | undefined , start ? : (a : ReadableStreamController ) => Promise < any > | undefined } | null , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    cancel (reason : any ) : any ;
    getReader ( ) : ReadableByteStreamReader ;
    locked : boolean ;
    pipeThrough (transform : { readable : ReadableStream , writable : WritableStream } , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : ReadableByteStream ;
    pipeTo (dest : WritableStream , opt_options ? : { preventAbort ? : boolean , preventCancel ? : boolean , preventClose ? : boolean } ) : Promise < any > ;
    tee ( ) : ReadableByteStream [] ;
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
    read ( ) : Promise < { done : boolean , value ? : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStream extends ReadableStream_Instance {
  }
  class ReadableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : { cancel ? : (a : any ) => Promise < any > | undefined , pull ? : (a : ReadableStreamController ) => Promise < any > | undefined , start ? : (a : ReadableStreamController ) => Promise < any > | undefined } | null , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
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
    close ( ) : void ;
    desiredSize : number ;
    enqueue (chunk : any ) : void ;
    error (e : any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStreamReader extends ReadableStreamReader_Instance {
  }
  class ReadableStreamReader_Instance {
    private noStructuralTyping_: any;
    constructor (stream : ReadableStream ) ;
    cancel (reason : any ) : void ;
    closed : boolean ;
    read ( ) : Promise < { done : boolean , value ? : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type ReferrerPolicy = string ;
  var ReferrerPolicy : {
    NONE : ReferrerPolicy ,
    NO_REFERRER : ReferrerPolicy ,
    NO_REFERRER_WHEN_DOWNGRADE : ReferrerPolicy ,
    ORIGIN : ReferrerPolicy ,
    ORIGIN_WHEN_CROSS_ORIGIN : ReferrerPolicy ,
    SAMEO_RIGIN : ReferrerPolicy ,
    STRICT_ORIGIN : ReferrerPolicy ,
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN : ReferrerPolicy ,
    UNSAFE_URL : ReferrerPolicy ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class Request extends Request_Instance {
  }
  class Request_Instance implements Body {
    private noStructuralTyping_: any;
    constructor (input : Request | string , opt_init ? : RequestInit ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    bodyUsed : any ;
    cache : RequestCache ;
    clone ( ) : Request ;
    credentials : RequestCredentials ;
    destination : RequestDestination ;
    formData ( ) : Promise < FormData > ;
    headers : Headers ;
    integrity : string ;
    json ( ) : Promise < any > ;
    method : string ;
    mode : RequestMode ;
    redirect : RequestRedirect ;
    referrer : string ;
    text ( ) : Promise < string > ;
    type : FetchRequestType ;
    url : string ;
  }
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
  type RequestCredentials = string ;
  var RequestCredentials : {
    INCLUDE : RequestCredentials ,
    OMIT : RequestCredentials ,
    SAME_ORIGIN : RequestCredentials ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type RequestDestination = string ;
  var RequestDestination : {
    DOCUMENT : RequestDestination ,
    EMBED : RequestDestination ,
    FONT : RequestDestination ,
    IMAGE : RequestDestination ,
    MANIFEST : RequestDestination ,
    MEDIA : RequestDestination ,
    NONE : RequestDestination ,
    OBJECT : RequestDestination ,
    REPORT : RequestDestination ,
    SCRIPT : RequestDestination ,
    SERVICEWORKER : RequestDestination ,
    SHAREDWORKER : RequestDestination ,
    STYLE : RequestDestination ,
    WORKER : RequestDestination ,
    XSLT : RequestDestination ,
  };
}
declare namespace ಠ_ಠ.clutz {
  interface RequestInit {
    body ? : Blob | ArrayBuffer | ArrayBufferView | FormData | string | null ;
    cache ? : RequestCache ;
    credentials ? : RequestCredentials ;
    headers ? : Headers | string [] [] | IObject < string , string > ;
    intergrity ? : string ;
    method ? : string ;
    mode ? : RequestMode ;
    redirect ? : RequestRedirect ;
    referrer ? : string ;
    referrerPolicy ? : ReferrerPolicy ;
    window ? : null ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type RequestMode = string ;
  var RequestMode : {
    CORS : RequestMode ,
    NAVIGATE : RequestMode ,
    NO_CORS : RequestMode ,
    SAME_ORIGIN : RequestMode ,
  };
}
declare namespace ಠ_ಠ.clutz {
  type RequestRedirect = string ;
  var RequestRedirect : {
    ERROR : RequestRedirect ,
    FOLLOW : RequestRedirect ,
    MANUAL : RequestRedirect ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class Response extends Response_Instance {
    static error ( ) : Response ;
    static redirect (url : string , opt_status ? : number ) : Response ;
  }
  class Response_Instance implements Body {
    private noStructuralTyping_: any;
    constructor (opt_body ? : Blob | ArrayBuffer | ArrayBufferView | FormData | string | ReadableStream | null , opt_init ? : ResponseInit ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    body : ReadableStream | null ;
    bodyUsed : any ;
    clone ( ) : Response ;
    formData ( ) : Promise < FormData > ;
    headers : Headers ;
    json ( ) : Promise < any > ;
    ok : boolean ;
    redirected : boolean ;
    status : number ;
    statusText : string ;
    text ( ) : Promise < string > ;
    trailer : Promise < Headers > ;
    type : ResponseType ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ResponseInit {
    headers ? : Headers | string [] [] | IObject < string , string > ;
    status ? : number ;
    statusText ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  type ResponseType = string ;
  var ResponseType : {
    BASIC : ResponseType ,
    CORS : ResponseType ,
    DEFAULT : ResponseType ,
    ERROR : ResponseType ,
    OPAQUE : ResponseType ,
    OPAQUEREDIRECT : ResponseType ,
  };
}
declare namespace ಠ_ಠ.clutz {
  class Tab extends Tab_Instance {
  }
  class Tab_Instance {
    private noStructuralTyping_: any;
    active : boolean ;
    favIconUrl : string ;
    height ? : number ;
    highlighted : boolean ;
    id : number ;
    incognito : boolean ;
    index : number ;
    openerTabId : number ;
    pinned : boolean ;
    sessionId ? : string ;
    status : string ;
    title : string ;
    url : string ;
    width ? : number ;
    windowId : number ;
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
  class WritableStream extends WritableStream_Instance {
  }
  class WritableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSink ? : { abort ? : (a : any ) => Promise < any > | undefined , close ? : ( ) => Promise < any > | undefined , start ? : (a : any ) => Promise < any > | undefined , write ? : (a : any ) => Promise < any > | undefined } , opt_strategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    abort (reason : any ) : Promise < undefined > ;
    close ( ) : Promise < undefined > ;
    closed : Promise < any > ;
    ready : Promise < any > ;
    state : string ;
    write (chunk : any ) : Promise < any > ;
  }
}
