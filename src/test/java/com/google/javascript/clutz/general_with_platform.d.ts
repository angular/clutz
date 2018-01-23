declare namespace ಠ_ಠ.clutz {
  interface module$exports$Body {
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    bodyUsed : boolean ;
    formData ( ) : Promise < FormData > ;
    json ( ) : Promise < any > ;
    text ( ) : Promise < string > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$ByteLengthQueuingStrategy extends module$exports$ByteLengthQueuingStrategy_Instance {
  }
  class module$exports$ByteLengthQueuingStrategy_Instance {
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
  class module$exports$CountQueuingStrategy extends module$exports$CountQueuingStrategy_Instance {
  }
  class module$exports$CountQueuingStrategy_Instance {
    private noStructuralTyping_: any;
    constructor (config : { highWaterMark : number } ) ;
    size (chunk : any ) : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$DirectoryEntry extends module$exports$DirectoryEntry_Instance {
  }
  class module$exports$DirectoryEntry_Instance extends ಠ_ಠ.clutz.module$exports$Entry_Instance {
    createReader ( ) : ಠ_ಠ.clutz.module$exports$DirectoryReader ;
    getDirectory (path : string , options ? : ಠ_ಠ.clutz.module$exports$FileSystemFlags , successCallback ? : (a : ಠ_ಠ.clutz.module$exports$DirectoryEntry ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    getFile (path : string , options ? : ಠ_ಠ.clutz.module$exports$FileSystemFlags , successCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileEntry ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    removeRecursively (successCallback : ( ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$DirectoryReader extends module$exports$DirectoryReader_Instance {
  }
  class module$exports$DirectoryReader_Instance {
    private noStructuralTyping_: any;
    readEntries (successCallback : (a : ಠ_ಠ.clutz.module$exports$Entry [] ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Entry extends module$exports$Entry_Instance {
  }
  class module$exports$Entry_Instance {
    private noStructuralTyping_: any;
    copyTo (parent : ಠ_ಠ.clutz.module$exports$DirectoryEntry , newName ? : string , successCallback ? : (a : ಠ_ಠ.clutz.module$exports$Entry ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    filesystem : ಠ_ಠ.clutz.module$exports$FileSystem ;
    fullPath : string ;
    getMetadata (successCallback : (a : ಠ_ಠ.clutz.module$exports$Metadata ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    getParent (successCallback : (a : ಠ_ಠ.clutz.module$exports$Entry ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    isDirectory : boolean ;
    isFile : boolean ;
    moveTo (parent : ಠ_ಠ.clutz.module$exports$DirectoryEntry , newName ? : string , successCallback ? : (a : ಠ_ಠ.clutz.module$exports$Entry ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    name : string ;
    remove (successCallback : ( ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    toURL (mimeType ? : string ) : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$FileEntry extends module$exports$FileEntry_Instance {
  }
  class module$exports$FileEntry_Instance extends ಠ_ಠ.clutz.module$exports$Entry_Instance {
    createWriter (successCallback : (a : ಠ_ಠ.clutz.module$exports$FileWriter ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
    file (successCallback : (a : File ) => any , errorCallback ? : (a : ಠ_ಠ.clutz.module$exports$FileError ) => any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$FileError extends module$exports$FileError_Instance {
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
  class module$exports$FileError_Instance extends DOMError {
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
  class module$exports$FileSaver extends module$exports$FileSaver_Instance {
  }
  class module$exports$FileSaver_Instance {
    private noStructuralTyping_: any;
    DONE : number ;
    INIT : number ;
    WRITING : number ;
    abort ( ) : void ;
    error : ಠ_ಠ.clutz.module$exports$FileError | null ;
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
  class module$exports$FileSystem extends module$exports$FileSystem_Instance {
  }
  class module$exports$FileSystem_Instance {
    private noStructuralTyping_: any;
    name : string ;
    root : ಠ_ಠ.clutz.module$exports$DirectoryEntry ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$FileSystemFlags {
    create ? : boolean ;
    exclusive ? : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$FileWriter extends module$exports$FileWriter_Instance {
  }
  class module$exports$FileWriter_Instance extends ಠ_ಠ.clutz.module$exports$FileSaver_Instance {
    length : number ;
    position : number ;
    seek (offset : number ) : void ;
    truncate (size : number ) : void ;
    write (blob : Blob ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Headers extends module$exports$Headers_Instance {
  }
  class module$exports$Headers_Instance implements Iterable < string [] > {
    private noStructuralTyping_: any;
    constructor (opt_headersInit ? : ಠ_ಠ.clutz.module$exports$Headers | string [] [] | IObject < string , string > ) ;
    [Symbol.iterator]():  Iterator < string [] > ;
    append (name : string , value : string ) : void ;
    delete (name : string ) : void ;
    entries ( ) : IterableIterator < string [] > ;
    get (name : string ) : string | null ;
    getAll (name : string ) : string [] ;
    has (name : string ) : boolean ;
    keys ( ) : Iterator < string > ;
    set (name : string , value : string ) : void ;
    values ( ) : Iterator < string > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Image extends module$exports$Image_Instance {
  }
  class module$exports$Image_Instance extends HTMLImageElement {
    constructor (opt_width ? : number , opt_height ? : number ) ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * Metadata interface.
   */
  class module$exports$Metadata extends module$exports$Metadata_Instance {
  }
  class module$exports$Metadata_Instance {
    private noStructuralTyping_: any;
    modificationTime : GlobalDate ;
    size : number ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$PipeOptions {
    preventAbort ? : boolean ;
    preventCancel ? : boolean ;
    preventClose ? : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableByteStreamController constructor cannot be used directly;
   * it only works on a ReadableStream that is in the middle of being constructed.
   */
  interface module$exports$ReadableByteStreamController {
    byobRequest : ಠ_ಠ.clutz.module$exports$ReadableStreamBYOBRequest ;
    close ( ) : void ;
    desiredSize : number ;
    enqueue (chunk : ArrayBufferView ) : void ;
    error (err : any ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$ReadableStream extends module$exports$ReadableStream_Instance {
  }
  class module$exports$ReadableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSource ? : ಠ_ಠ.clutz.module$exports$ReadableStreamSource , opt_queuingStrategy ? : ಠ_ಠ.clutz.module$exports$CountQueuingStrategy | ಠ_ಠ.clutz.module$exports$ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    cancel (reason : any ) : Promise < undefined > ;
    getReader (opt_options ? : { mode ? : string } ) : ಠ_ಠ.clutz.module$exports$ReadableStreamDefaultReader | ಠ_ಠ.clutz.module$exports$ReadableStreamBYOBReader ;
    locked : boolean ;
    pipeThrough (transform : ಠ_ಠ.clutz.module$exports$TransformStream , opt_options ? : ಠ_ಠ.clutz.module$exports$PipeOptions ) : ಠ_ಠ.clutz.module$exports$ReadableStream ;
    pipeTo (dest : ಠ_ಠ.clutz.module$exports$WritableStream , opt_options ? : ಠ_ಠ.clutz.module$exports$PipeOptions ) : Promise < undefined > ;
    tee ( ) : ಠ_ಠ.clutz.module$exports$ReadableStream [] ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamBYOBReader constructor is generally not meant to be used
   * directly; instead, a stream’s getReader() method should be used.
   */
  interface module$exports$ReadableStreamBYOBReader {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read (view : ArrayBufferView ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$ReadableStreamBYOBRequest {
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
  interface module$exports$ReadableStreamDefaultController {
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
  interface module$exports$ReadableStreamDefaultReader {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read ( ) : Promise < { done : boolean , value : any } > ;
    releaseLock ( ) : void ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$ReadableStreamSource {
    autoAllocateChunkSize ? : number ;
    cancel ? : (a : any ) => Promise < any > | undefined ;
    pull ? : (a : ಠ_ಠ.clutz.module$exports$ReadableByteStreamController | ಠ_ಠ.clutz.module$exports$ReadableStreamDefaultController ) => PromiseLike < any > | undefined ;
    start ? : (a : ಠ_ಠ.clutz.module$exports$ReadableByteStreamController | ಠ_ಠ.clutz.module$exports$ReadableStreamDefaultController ) => PromiseLike < any > | undefined ;
    type ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  class module$exports$Request extends module$exports$Request_Instance {
  }
  class module$exports$Request_Instance implements ಠ_ಠ.clutz.module$exports$Body {
    private noStructuralTyping_: any;
    constructor (input : ಠ_ಠ.clutz.module$exports$Request | string , opt_init ? : ಠ_ಠ.clutz.module$exports$RequestInit ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    bodyUsed : any ;
    cache : string ;
    clone ( ) : ಠ_ಠ.clutz.module$exports$Request ;
    credentials : string ;
    destination : string ;
    formData ( ) : Promise < FormData > ;
    headers : ಠ_ಠ.clutz.module$exports$Headers ;
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
  interface module$exports$RequestInit {
    body ? : Blob | ArrayBuffer | ArrayBufferView | FormData | string | null ;
    cache ? : string ;
    credentials ? : string ;
    headers ? : ಠ_ಠ.clutz.module$exports$Headers | string [] [] | IObject < string , string > ;
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
  class module$exports$Response extends module$exports$Response_Instance {
    static error ( ) : ಠ_ಠ.clutz.module$exports$Response ;
    static redirect (url : string , opt_status ? : number ) : ಠ_ಠ.clutz.module$exports$Response ;
  }
  class module$exports$Response_Instance implements ಠ_ಠ.clutz.module$exports$Body {
    private noStructuralTyping_: any;
    constructor (opt_body ? : Blob | ArrayBuffer | ArrayBufferView | FormData | string | ಠ_ಠ.clutz.module$exports$ReadableStream | null , opt_init ? : ಠ_ಠ.clutz.module$exports$ResponseInit ) ;
    arrayBuffer ( ) : Promise < ArrayBuffer > ;
    blob ( ) : Promise < Blob > ;
    body : ಠ_ಠ.clutz.module$exports$ReadableStream | null ;
    bodyUsed : any ;
    clone ( ) : ಠ_ಠ.clutz.module$exports$Response ;
    formData ( ) : Promise < FormData > ;
    headers : ಠ_ಠ.clutz.module$exports$Headers ;
    json ( ) : Promise < any > ;
    ok : boolean ;
    redirected : boolean ;
    status : number ;
    statusText : string ;
    text ( ) : Promise < string > ;
    trailer : Promise < ಠ_ಠ.clutz.module$exports$Headers > ;
    type : string ;
    url : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$ResponseInit {
    headers ? : ಠ_ಠ.clutz.module$exports$Headers | string [] [] | IObject < string , string > ;
    status ? : number ;
    statusText ? : string ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$TransformStream {
    readable : ಠ_ಠ.clutz.module$exports$ReadableStream ;
    writable : ಠ_ಠ.clutz.module$exports$WritableStream ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$WorkerLocation {
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
  class module$exports$WritableStream extends module$exports$WritableStream_Instance {
  }
  class module$exports$WritableStream_Instance {
    private noStructuralTyping_: any;
    constructor (opt_underlyingSink ? : ಠ_ಠ.clutz.module$exports$WritableStreamSink , opt_queuingStrategy ? : ಠ_ಠ.clutz.module$exports$CountQueuingStrategy | ಠ_ಠ.clutz.module$exports$ByteLengthQueuingStrategy | { highWaterMark : number , size ? : (a : any ) => number } ) ;
    abort (reason : any ) : Promise < undefined > ;
    getWriter ( ) : ಠ_ಠ.clutz.module$exports$WritableStreamDefaultWriter ;
    locked : boolean ;
  }
}
declare namespace ಠ_ಠ.clutz {
  /**
   * The WritableStreamDefaultController constructor cannot be used directly;
   * it only works on a WritableStream that is in the middle of being constructed.
   */
  interface module$exports$WritableStreamDefaultController {
    error (err : any ) : Promise < undefined > ;
  }
}
declare namespace ಠ_ಠ.clutz {
  interface module$exports$WritableStreamDefaultWriter {
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
  interface module$exports$WritableStreamSink {
    abort ? : (a : any ) => PromiseLike < any > | undefined ;
    close ? : ( ) => PromiseLike < any > | undefined ;
    start ? : (a : ಠ_ಠ.clutz.module$exports$WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
    write ? : (a : ಠ_ಠ.clutz.module$exports$WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
  }
}
