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
    /**
     * If we don't want to be strict we can define chunk as {*}
     * and return as {number|undefined}
     */
    size (chunk : { byteLength : number } ) : number ;
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
    addListener (callback : (a : boolean ) => void ) : void ;
    hasListener (callback : (a : boolean ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : boolean ) => void ) : void ;
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
    addListener (callback : (a : GlobalObject ) => void ) : void ;
    hasListener (callback : (a : GlobalObject ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : GlobalObject ) => void ) : void ;
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
    addListener (callback : (a : string [] ) => void ) : void ;
    hasListener (callback : (a : string [] ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string [] ) => void ) : void ;
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
    addListener (callback : (a : string ) => void ) : void ;
    hasListener (callback : (a : string ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string ) => void ) : void ;
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
    addListener (callback : (a : string , b : string ) => void ) : void ;
    hasListener (callback : (a : string , b : string ) => void ) : boolean ;
    hasListeners ( ) : boolean ;
    removeListener (callback : (a : string , b : string ) => void ) : void ;
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
    getDirectory (path : string , options ? : FileSystemFlags , successCallback ? : (a : DirectoryEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    getFile (path : string , options ? : FileSystemFlags , successCallback ? : (a : FileEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
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
  interface FileSystemFlags {
    create ? : boolean ;
    exclusive ? : boolean ;
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
  class MutedInfo extends MutedInfo_Instance {
  }
  class MutedInfo_Instance {
    private noStructuralTyping_: any;
    extensionId ? : string ;
    muted : boolean ;
    reason ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface PipeOptions {
    preventAbort ? : boolean ;
    preventCancel ? : boolean ;
    preventClose ? : boolean ;
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
  /**
   * The ReadableByteStreamController constructor cannot be used directly;
   * it only works on a ReadableStream that is in the middle of being constructed.
   */
  interface ReadableByteStreamController {
    byobRequest : ReadableStreamBYOBRequest ;
    close ( ) : void ;
    desiredSize : number ;
    enqueue (chunk : ArrayBufferView ) : void ;
    error (err : any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class ReadableStream extends ReadableStream_Instance {
  }
  class ReadableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : ReadableStreamSource , opt_queuingStrategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    cancel (reason : any ) : Promise < undefined > ;
    getReader (opt_options ? : { mode ? : string } ) : ReadableStreamDefaultReader | ReadableStreamBYOBReader ;
    locked : boolean ;
    pipeThrough (transform : TransformStream , opt_options ? : PipeOptions ) : ReadableStream ;
    pipeTo (dest : WritableStream , opt_options ? : PipeOptions ) : Promise < undefined > ;
    tee ( ) : ReadableStream [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamBYOBReader constructor is generally not meant to be used
   * directly; instead, a stream’s getReader() method should be used.
   */
  interface ReadableStreamBYOBReader {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read (view : ArrayBufferView ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ReadableStreamBYOBRequest {
    respond (bytesWritten : number ) : void ;
    respondWithNewView (view : ArrayBufferView ) : void ;
    view : ArrayBufferView ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamDefaultController constructor cannot be used directly;
   * it only works on a ReadableStream that is in the middle of being constructed.
   */
  interface ReadableStreamDefaultController {
    close ( ) : void ;
    desiredSize : number ;
    enqueue (chunk : any ) : void ;
    error (err : any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamDefaultReader constructor is generally not meant to be used directly;
   * instead, a stream’s getReader() method should be used.
   */
  interface ReadableStreamDefaultReader {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read ( ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ReadableStreamSource {
    autoAllocateChunkSize ? : number ;
    cancel ? : (a : any ) => Promise < any > | undefined ;
    pull ? : (a : ReadableByteStreamController | ReadableStreamDefaultController ) => PromiseLike < any > | undefined ;
    start ? : (a : ReadableByteStreamController | ReadableStreamDefaultController ) => PromiseLike < any > | undefined ;
    type ? : string ;
  }
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
    cache : string ;
    clone ( ) : Request ;
    credentials : string ;
    destination : string ;
    formData ( ) : Promise < FormData > ;
    headers : Headers ;
    integrity : string ;
    json ( ) : Promise < any > ;
    method : string ;
    mode : string ;
    redirect : string ;
    referrer : string ;
    text ( ) : Promise < string > ;
    type : string ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface RequestInit {
    body ? : Blob | ArrayBuffer | ArrayBufferView | FormData | string | null ;
    cache ? : string ;
    credentials ? : string ;
    headers ? : Headers | string [] [] | IObject < string , string > ;
    integrity ? : string ;
    method ? : string ;
    mode ? : string ;
    redirect ? : string ;
    referrer ? : string ;
    referrerPolicy ? : string ;
    window ? : null ;
  }
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
    type : string ;
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
  class Tab extends Tab_Instance {
  }
  class Tab_Instance {
    private noStructuralTyping_: any;
    active : boolean ;
    audible ? : boolean ;
    autoDiscardable : boolean ;
    discarded : boolean ;
    favIconUrl : string ;
    height ? : number ;
    highlighted : boolean ;
    id : number ;
    incognito : boolean ;
    index : number ;
    mutedInfo ? : MutedInfo ;
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
  interface TransformStream {
    readable : ReadableStream ;
    writable : WritableStream ;
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
    constructor (opt_underlyingSink ? : WritableStreamSink , opt_queuingStrategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    abort (reason : any ) : Promise < undefined > ;
    getWriter ( ) : WritableStreamDefaultWriter ;
    locked : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The WritableStreamDefaultController constructor cannot be used directly;
   * it only works on a WritableStream that is in the middle of being constructed.
   */
  interface WritableStreamDefaultController {
    error (err : any ) : Promise < undefined > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WritableStreamDefaultWriter {
    abort (reason : any ) : Promise < undefined > ;
    close ( ) : Promise < undefined > ;
    closed : Promise < undefined > ;
    desiredSize : number ;
    ready : Promise < number > ;
    releaseLock ( ) : void ;
    write (chunk : any ) : Promise < undefined > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface WritableStreamSink {
    abort ? : (a : any ) => PromiseLike < any > | undefined ;
    close ? : ( ) => PromiseLike < any > | undefined ;
    start ? : (a : WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
    write ? : (a : WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
  }
}
