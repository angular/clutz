declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * An error object for responses
   */
  type Error = { errorCode : number , errorMessage : string | null } ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  type RegisterRequest = { challenge : string , version : string } ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a registered key.
   */
  type RegisteredKey = { appId : string | null , keyHandle : string , transports ? : string [] , version : string } ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a sign response.
   */
  type SignResponse = { clientData : string , keyHandle : string , signatureData : string } ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a single sign request.
   */
  type Transport = string ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  function register (appId : string , registerRequests : ಠ_ಠ.clutz.u2f.RegisterRequest [] , registeredKeys : ಠ_ಠ.clutz.u2f.RegisteredKey [] , callback : (a : ಠ_ಠ.clutz.u2f.Error | ಠ_ಠ.clutz.u2f.SignResponse ) => any , opt_timeoutSeconds ? : number ) : any ;
}
declare namespace ಠ_ಠ.clutz.u2f {
  function sign (appId : string , challenge : string , registeredKeys : ಠ_ಠ.clutz.u2f.RegisteredKey [] , callback : (a : ಠ_ಠ.clutz.u2f.Error | ಠ_ಠ.clutz.u2f.SignResponse ) => any , opt_timeoutSeconds ? : number ) : any ;
}
declare namespace ಠ_ಠ.clutz {
  class DirectoryEntry extends Entry {
    private noStructuralTyping_DirectoryEntry : any;
    createReader ( ) : DirectoryReader ;
    getDirectory (path : string , options ? : FileSystemFlags , successCallback ? : (a : DirectoryEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    getFile (path : string , options ? : FileSystemFlags , successCallback ? : (a : FileEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    removeRecursively (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class DirectoryReader {
    private noStructuralTyping_DirectoryReader : any;
    readEntries (successCallback : (a : Entry [] ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class Entry {
    private noStructuralTyping_Entry : any;
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
  class FileEntry extends Entry {
    private noStructuralTyping_FileEntry : any;
    createWriter (successCallback : (a : FileWriter ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    file (successCallback : (a : File ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class FileError extends DOMError {
    private noStructuralTyping_FileError : any;
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
}
declare namespace ಠ_ಠ.clutz {
  class FileSaver {
    private noStructuralTyping_FileSaver : any;
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
  class FileSystem {
    private noStructuralTyping_FileSystem : any;
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
  class FileWriter extends FileSaver {
    private noStructuralTyping_FileWriter : any;
    length : number ;
    position : number ;
    seek (offset : number ) : void ;
    truncate (size : number ) : void ;
    write (blob : Blob ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Metadata interface.
   */
  class Metadata {
    private noStructuralTyping_Metadata : any;
    modificationTime : GlobalDate ;
    size : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface NavigatorStorage {
    storage : StorageManager ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface ShareData {
    text ? : string ;
    title ? : string ;
    url ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class StorageManager {
    private noStructuralTyping_StorageManager : any;
    estimate ( ) : Promise < { quota : number , usage : number } > ;
    persist ( ) : Promise < boolean > ;
    persisted ( ) : Promise < boolean > ;
  }
}
declare namespace ಠ_ಠ.clutz.window {
  type StorageEstimate = { quota : number , usage : number } ;
}
declare namespace ಠ_ಠ.clutz {
  class ByteLengthQueuingStrategy {
    private noStructuralTyping_ByteLengthQueuingStrategy : any;
    constructor (config : { highWaterMark : number } ) ;
    /**
     * If we don't want to be strict we can define chunk as {*}
     * and return as {number|undefined}
     */
    size (chunk : { byteLength : number } ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class CountQueuingStrategy {
    private noStructuralTyping_CountQueuingStrategy : any;
    constructor (config : { highWaterMark : number } ) ;
    size (chunk : any ) : number ;
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
  /**
   * The TransformStreamDefaultController class has methods that allow
   * manipulation of the associated ReadableStream and WritableStream.
   *
   * This class cannot be directly constructed and is instead passed by the
   * TransformStream to the methods of its transformer.
   */
  interface TransformStreamDefaultController {
    desiredSize : number ;
    enqueue (chunk : any ) : void ;
    error (reason : any ) : void ;
    terminate ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface TransformStreamTransformer {
    flush ? : (a : TransformStreamDefaultController ) => PromiseLike < any > | undefined ;
    start ? : (a : TransformStreamDefaultController ) => PromiseLike < any > | undefined ;
    transform ? : (a : any , b : TransformStreamDefaultController ) => PromiseLike < any > | undefined ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class WritableStream {
    private noStructuralTyping_WritableStream : any;
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
    write ? : (a : any , b : WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class AbortController {
    private noStructuralTyping_AbortController : any;
    abort ( ) : void ;
    signal : AbortSignal ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface AbortSignal extends GlobalEventTarget {
    aborted : boolean ;
    onabort : ( (a : GlobalEvent ) => any ) | null ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface Clipboard {
    readText ( ) : Promise < string > ;
    writeText (text : string ) : Promise < undefined > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface RTCRtpSendParameters {
    /**
     * Possible string values are "maintain-framerate", "maintain-resolution", and
     * "balanced".
     */
    degradationPreference ? : string ;
    encodings : RTCRtpEncodingParameters [] ;
    transactionId ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface RTCRtpTransceiverInit {
    /**
     * The direction of the `RTCRtpTransceiver`. Defaults to "sendrecv".
     */
    direction ? : string | null ;
    sendEncodings ? : RTCRtpEncodingParameters [] | null ;
    /**
     * The streams to add to the tranceiver's sender.
     */
    streams ? : MediaStream [] | null ;
  }
}
declare namespace ಠ_ಠ.clutz.window {
  /**
   * Possible values are "sendrecv", "sendonly", "recvonly", and "inactive".
   */
  type RTCRtpTransceiverDirection = string ;
}
declare namespace ಠ_ಠ.clutz {
  class TrustedHTML {
    private noStructuralTyping_TrustedHTML : any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TrustedScript {
    private noStructuralTyping_TrustedScript : any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TrustedScriptURL {
    private noStructuralTyping_TrustedScriptURL : any;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TrustedTypePolicy {
    private noStructuralTyping_TrustedTypePolicy : any;
    createHTML (s : string ) : TrustedHTML ;
    createScript (s : string ) : TrustedScript ;
    createScriptURL (s : string ) : TrustedScriptURL ;
    createURL (s : string ) : TrustedURL ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class TrustedTypePolicyFactory {
    private noStructuralTyping_TrustedTypePolicyFactory : any;
    createPolicy (name : string , policy : { createHTML : (a : string ) => string , createScript : (a : string ) => string , createScriptURL : (a : string ) => string , createURL : (a : string ) => string } , opt_expose ? : boolean ) : TrustedTypePolicy ;
    getExposedPolicy (name : string ) : TrustedTypePolicy ;
    getPolicyNames ( ) : string [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  let TrustedTypes : TrustedTypePolicyFactory ;
}
declare namespace ಠ_ಠ.clutz {
  class TrustedURL {
    private noStructuralTyping_TrustedURL : any;
  }
}
