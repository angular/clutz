// Generated from externs.zip//es6.js
declare namespace ಠ_ಠ.clutz {
  interface Transferable {
  }
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * An error object for responses
   */
  type Error = { errorCode : number , errorMessage : string | null } ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  type RegisterRequest = { challenge : string , version : string } ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a registered key.
   */
  type RegisteredKey = { appId : string | null , keyHandle : string , transports ? : string [] , version : string } ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a sign response.
   */
  type SignResponse = { clientData : string , keyHandle : string , signatureData : string } ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  /**
   * Data object for a single sign request.
   */
  type Transport = string ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  function register (appId : string , registerRequests : ಠ_ಠ.clutz.u2f.RegisterRequest [] , registeredKeys : ಠ_ಠ.clutz.u2f.RegisteredKey [] , callback : (a : ಠ_ಠ.clutz.u2f.Error | ಠ_ಠ.clutz.u2f.SignResponse ) => any , opt_timeoutSeconds ? : number ) : any ;
}
// Generated from externs.zip//fido.js
declare namespace ಠ_ಠ.clutz.u2f {
  function sign (appId : string , challenge : string , registeredKeys : ಠ_ಠ.clutz.u2f.RegisteredKey [] , callback : (a : ಠ_ಠ.clutz.u2f.Error | ಠ_ಠ.clutz.u2f.SignResponse ) => any , opt_timeoutSeconds ? : number ) : any ;
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  abstract class BaseRenderingContext2D implements CanvasDrawingStyles , CanvasPathMethods {
    arc (x : number , y : number , radius : number , startAngle : number , endAngle : number , opt_anticlockwise ? : boolean ) : void ;
    arcTo (x1 : number , y1 : number , x2 : number , y2 : number , radius : number ) : void ;
    beginPath ( ) : void ;
    bezierCurveTo (cp1x : number , cp1y : number , cp2x : number , cp2y : number , x : number , y : number ) : void ;
    canvas : HTMLCanvasElement | OffscreenCanvas ;
    clearRect (x : number , y : number , w : number , h : number ) : void ;
    clip (optFillRuleOrPath ? : Path2D | null | string , optFillRule ? : string ) : void ;
    closePath ( ) : void ;
    createImageData (sw : number , sh : number ) : ImageData ;
    createLinearGradient (x0 : number , y0 : number , x1 : number , y1 : number ) : CanvasGradient ;
    createPattern (image : HTMLImageElement | null | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas , repetition : string ) : CanvasPattern | null ;
    createRadialGradient (x0 : number , y0 : number , r0 : number , x1 : number , y1 : number , r1 : number ) : CanvasGradient ;
    drawFocusIfNeeded (element : GlobalElement | null ) : void ;
    drawImage (image : HTMLImageElement | null | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas , dx : number , dy : number , opt_dw ? : number , opt_dh ? : number , opt_sx ? : number , opt_sy ? : number , opt_sw ? : number , opt_sh ? : number ) : void ;
    ellipse (x : number , y : number , radiusX : number , radiusY : number , rotation : number , startAngle : number , endAngle : number , opt_anticlockwise ? : boolean ) : void ;
    fill (optFillRuleOrPath ? : Path2D | null | string , optFillRule ? : string ) : void ;
    fillColor : string ;
    fillRect (x : number , y : number , w : number , h : number ) : void ;
    fillStyle : string | CanvasGradient | CanvasPattern ;
    fillText (text : string , x : number , y : number , opt_maxWidth ? : number ) : void ;
    font : string ;
    getImageData (sx : number , sy : number , sw : number , sh : number ) : ImageData ;
    getLineDash ( ) : number [] ;
    globalAlpha : number ;
    globalCompositeOperation : string ;
    imageSmoothingEnabled : boolean ;
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
    putImageData (imagedata : ImageData | null , dx : number , dy : number , opt_dirtyX ? : number , opt_dirtyY ? : number , opt_dirtyWidth ? : number , opt_dirtyHeight ? : number ) : void ;
    quadraticCurveTo (cpx : number , cpy : number , x : number , y : number ) : void ;
    rect (x : number , y : number , w : number , h : number ) : void ;
    restore ( ) : void ;
    rotate (angle : number ) : void ;
    save ( ) : void ;
    scale (x : number , y : number ) : void ;
    /**
     * Note: WebKit only
     * @deprecated
     */
    setFillColor (opt_a ? : number | string , opt_b ? : number , opt_c ? : number , opt_d ? : number , opt_e ? : number ) : void ;
    setLineDash (segments : number [] | null ) : void ;
    /**
     * Note: WebKit only
     * @deprecated
     */
    setStrokeColor (opt_a ? : number | string , opt_b ? : number , opt_c ? : number , opt_d ? : number , opt_e ? : number ) : void ;
    setTransform (m11 : number , m12 : number , m21 : number , m22 : number , dx : number , dy : number ) : void ;
    shadowBlur : number ;
    shadowColor : string ;
    shadowOffsetX : number ;
    shadowOffsetY : number ;
    stroke (optStroke ? : Path2D | null ) : void ;
    strokeColor : string ;
    strokeRect (x : number , y : number , w : number , h : number ) : void ;
    strokeStyle : string | CanvasGradient | CanvasPattern ;
    strokeText (text : string , x : number , y : number , opt_maxWidth ? : number ) : void ;
    textAlign : string ;
    textBaseline : string ;
    transform (m11 : number , m12 : number , m21 : number , m22 : number , dx : number , dy : number ) : void ;
    translate (x : number , y : number ) : void ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  interface CanvasDrawingStyles {
    font : string ;
    getLineDash ( ) : number [] ;
    lineCap : string ;
    lineJoin : string ;
    lineWidth : number ;
    miterLimit : number ;
    setLineDash (segments : number [] | null ) : void ;
    textAlign : string ;
    textBaseline : string ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  interface CanvasPathMethods {
    arc (x : number , y : number , radius : number , startAngle : number , endAngle : number , opt_anticlockwise ? : boolean ) : void ;
    arcTo (x1 : number , y1 : number , x2 : number , y2 : number , radius : number ) : void ;
    bezierCurveTo (cp1x : number , cp1y : number , cp2x : number , cp2y : number , x : number , y : number ) : void ;
    closePath ( ) : void ;
    lineTo (x : number , y : number ) : void ;
    moveTo (x : number , y : number ) : void ;
    quadraticCurveTo (cpx : number , cpy : number , x : number , y : number ) : void ;
    rect (x : number , y : number , w : number , h : number ) : void ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  interface NavigatorStorage {
    storage : StorageManager ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  class OffscreenCanvas implements GlobalEventTarget , Transferable {
    constructor (width : number , height : number ) ;
    addEventListener < THIS = any > (type : string , listener : EventListener | null | ( (this : THIS , a : GlobalEvent ) => any ) , opt_options ? : boolean | AddEventListenerOptions ) : void ;
    convertToBlob (opt_options ? : { quality ? : number , type ? : string } ) : Promise < Blob > ;
    dispatchEvent (evt : GlobalEvent ) : boolean ;
    getContext (contextId : string , opt_options ? : GlobalObject ) : GlobalObject ;
    height : number ;
    removeEventListener < THIS = any > (type : string , listener : EventListener | null | ( (this : THIS , a : GlobalEvent ) => any ) , opt_options ? : boolean | EventListenerOptions ) : void ;
    transferToImageBitmap ( ) : ImageBitmap ;
    width : number ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  class OffscreenCanvasRenderingContext2D extends BaseRenderingContext2D {
    canvas : OffscreenCanvas ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  interface ShareData {
    text ? : string ;
    title ? : string ;
    url ? : string ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  type StorageEstimate = { quota : number , usage : number } ;
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  class StorageManager {
    estimate ( ) : Promise < ಠ_ಠ.clutz.StorageEstimate > ;
    persist ( ) : Promise < boolean > ;
    persisted ( ) : Promise < boolean > ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  /**
   * Trust Tokens operation (issuance, signing, and redemption) is specified via
   * an instance of the following parameters struct, provided via Fetch, XHR, or
   * the iframe tag.
   * TODO(b/161890603): Trust Token: Remove the 'issuer' fields after Chrome 86 hits stable.
   */
  type TrustTokenAttributeType = { additionalSignedHeaders ? : string [] , additionalSigningData ? : string , includeTimestampHeader : boolean , issuer ? : string , issuers ? : string [] , refreshPolicy : string , signRequestData : string , type : string } ;
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The metadata provided by the callback given to
   * HTMLVideoElement.requestVideoFrameCallback().
   *
   * See https://wicg.github.io/video-rvfc/#video-frame-metadata
   */
  interface VideoFrameMetadata {
    /**
     * For video frames coming from either a local or remote source, this is the
     * time at which the frame was captured by the camera.
     */
    captureTime ? : number ;
    /**
     * The time at which the user agent expects the frame to be visible.
     */
    expectedDisplayTime : number ;
    /**
     * The height of the video frame, in media pixels.
     */
    height : number ;
    /**
     * The media presentation timestamp (PTS) in seconds of the frame presented
     * (e.g. its timestamp on the video.currentTime timeline).
     */
    mediaTime : number ;
    /**
     * The time at which the user agent submitted the frame for composition.
     */
    presentationTime : number ;
    /**
     * A count of the number of frames submitted for composition.
     */
    presentedFrames : number ;
    /**
     * The elapsed duration in seconds from submission of the encoded packet with
     * the same presentation timestamp (PTS) as this frame (e.g. same as the
     * mediaTime) to the decoder until the decoded frame was ready for presentation.
     */
    processingDuration ? : number ;
    /**
     * For video frames coming from a remote source, this is the time the encoded
     * frame was received by the platform, i.e., the time at which the last packet
     * belonging to this frame was received over the network.
     */
    receiveTime ? : number ;
    /**
     * The RTP timestamp associated with this video frame.
     */
    rtpTimestamp ? : number ;
    /**
     * The width of the video frame, in media pixels.
     */
    width : number ;
  }
}
// Generated from externs.zip//html5.js
declare namespace ಠ_ಠ.clutz {
  type VideoFrameRequestCallback = (a : number , b : VideoFrameMetadata | null ) => void ;
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class DirectoryEntry extends Entry {
    createReader ( ) : DirectoryReader ;
    getDirectory (path : string , options ? : FileSystemFlags , successCallback ? : (a : DirectoryEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    getFile (path : string , options ? : FileSystemFlags , successCallback ? : (a : FileEntry ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    removeRecursively (successCallback : ( ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class DirectoryEntrySync extends EntrySync {
    createReader ( ) : DirectoryReaderSync ;
    getDirectory (path : string , options ? : GlobalObject | null ) : DirectoryEntrySync ;
    getFile (path : string , options ? : GlobalObject | null ) : FileEntrySync ;
    removeRecursively ( ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class DirectoryReader {
    readEntries (successCallback : (a : Entry [] ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class DirectoryReaderSync {
    readEntries ( ) : EntrySync [] ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class Entry {
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
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class EntrySync {
    copyTo (parent : DirectoryEntrySync , newName ? : string ) : EntrySync ;
    filesystem : FileSystemSync ;
    fullPath : string ;
    getMetadata ( ) : Metadata ;
    getParent ( ) : DirectoryEntrySync ;
    isDirectory : boolean ;
    isFile : boolean ;
    moveTo (parent : DirectoryEntrySync , newName ? : string ) : EntrySync ;
    name : string ;
    remove ( ) : void ;
    toURL (mimeType ? : string ) : string ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileEntry extends Entry {
    createWriter (successCallback : (a : FileWriter ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
    file (successCallback : (a : File ) => any , errorCallback ? : (a : FileError ) => any ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileEntrySync extends EntrySync {
    createWriter ( ) : FileWriterSync ;
    file ( ) : File ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileError extends DOMError {
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
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileException {
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
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileSaver {
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
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileSystem {
    name : string ;
    root : DirectoryEntry ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  interface FileSystemFlags {
    create ? : boolean ;
    exclusive ? : boolean ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileSystemSync {
    name : string ;
    root : DirectoryEntrySync ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileWriter extends FileSaver {
    length : number ;
    position : number ;
    seek (offset : number ) : void ;
    truncate (size : number ) : void ;
    write (blob : Blob ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  class FileWriterSync {
    length : number ;
    position : number ;
    seek (offset : number ) : void ;
    truncate (size : number ) : void ;
    write (blob : Blob ) : void ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * LocalFileSystemSync interface, implemented by WorkerGlobalScope.
   */
  class LocalFileSystemSync {
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * Metadata interface.
   */
  class Metadata {
    modificationTime : GlobalDate ;
    size : number ;
  }
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  function requestFileSystemSync (type : number , size : number ) : FileSystemSync ;
}
// Generated from externs.zip//nonstandard_fileapi.js
declare namespace ಠ_ಠ.clutz {
  function webkitRequestFileSystemSync (type : number , size : number ) : FileSystemSync ;
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  class ByteLengthQueuingStrategy {
    constructor (config : { highWaterMark : number } ) ;
    /**
     * If we don't want to be strict we can define chunk as {*}
     * and return as {number|undefined}
     */
    size (chunk : { byteLength : number } ) : number ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  class CountQueuingStrategy {
    constructor (config : { highWaterMark : number } ) ;
    size (chunk : any ) : number ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * A transform stream (https://streams.spec.whatwg.org/#transform-stream).
   */
  interface ITransformStream < IN_VALUE = any , OUT_VALUE = any > {
    readable : ReadableStream < OUT_VALUE > ;
    writable : WritableStream < IN_VALUE > ;
  }
}
// Generated from externs.zip//streamsapi.js
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
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamBYOBReader constructor is generally not meant to be used
   * directly; instead, a stream’s getReader() method should be used.
   */
  interface ReadableStreamBYOBReader {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read < BUFFER = any > (view : BUFFER ) : Promise < IteratorResult < BUFFER > > ;
    releaseLock ( ) : void ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface ReadableStreamBYOBRequest {
    respond (bytesWritten : number ) : void ;
    respondWithNewView (view : ArrayBufferView ) : void ;
    view : ArrayBufferView ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamDefaultController constructor cannot be used directly;
   * it only works on a ReadableStream that is in the middle of being constructed.
   */
  interface ReadableStreamDefaultController < VALUE = any > {
    close ( ) : void ;
    desiredSize : number ;
    enqueue (chunk : VALUE ) : void ;
    error (err : any ) : void ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The ReadableStreamDefaultReader constructor is generally not meant to be used
   * directly; instead, a stream’s getReader() method should be used.
   */
  interface ReadableStreamDefaultReader < VALUE = any > {
    cancel (reason : any ) : Promise < any > ;
    closed : Promise < undefined > ;
    read ( ) : Promise < IteratorResult < VALUE > > ;
    releaseLock ( ) : void ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface ReadableStreamIteratorOptions {
    preventCancel ? : boolean ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface ReadableStreamSource < VALUE = any > {
    autoAllocateChunkSize ? : number ;
    cancel ? : (a : any ) => Promise < any > | undefined ;
    pull ? : (a : ReadableByteStreamController | ReadableStreamDefaultController < VALUE > ) => PromiseLike < any > | undefined ;
    start ? : (a : ReadableByteStreamController | ReadableStreamDefaultController < VALUE > ) => PromiseLike < any > | undefined ;
    type ? : string ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The TransformStreamDefaultController class has methods that allow
   * manipulation of the associated ReadableStream and WritableStream.
   *
   * This class cannot be directly constructed and is instead passed by the
   * TransformStream to the methods of its transformer.
   */
  interface TransformStreamDefaultController < OUT_VALUE = any > {
    desiredSize : number ;
    enqueue (chunk : OUT_VALUE ) : void ;
    error (reason : any ) : void ;
    terminate ( ) : void ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface TransformStreamTransformer < IN_VALUE = any , OUT_VALUE = any > {
    flush ? : (a : TransformStreamDefaultController < OUT_VALUE > ) => PromiseLike < any > | undefined ;
    start ? : (a : TransformStreamDefaultController < OUT_VALUE > ) => PromiseLike < any > | undefined ;
    transform ? : (a : IN_VALUE , b : TransformStreamDefaultController < OUT_VALUE > ) => PromiseLike < any > | undefined ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  class WritableStream < VALUE = any > {
    constructor (opt_underlyingSink ? : WritableStreamSink < VALUE > , opt_queuingStrategy ? : CountQueuingStrategy | ByteLengthQueuingStrategy | { highWaterMark ? : number , size ? : (a : any ) => number } ) ;
    abort (reason : any ) : Promise < undefined > ;
    close ( ) : Promise < undefined > ;
    getWriter ( ) : WritableStreamDefaultWriter < VALUE > ;
    locked : boolean ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  /**
   * The WritableStreamDefaultController constructor cannot be used directly;
   * it only works on a WritableStream that is in the middle of being constructed.
   */
  interface WritableStreamDefaultController {
    error (err : any ) : Promise < undefined > ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface WritableStreamDefaultWriter < VALUE = any > {
    abort (reason : any ) : Promise < undefined > ;
    close ( ) : Promise < undefined > ;
    closed : Promise < undefined > ;
    desiredSize : number ;
    ready : Promise < number > ;
    releaseLock ( ) : void ;
    write (chunk : VALUE ) : Promise < undefined > ;
  }
}
// Generated from externs.zip//streamsapi.js
declare namespace ಠ_ಠ.clutz {
  interface WritableStreamSink < VALUE = any > {
    abort ? : (a : any ) => PromiseLike < any > | undefined ;
    close ? : ( ) => PromiseLike < any > | undefined ;
    start ? : (a : WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
    write ? : (a : VALUE , b : WritableStreamDefaultController ) => PromiseLike < any > | undefined ;
  }
}
// Generated from externs.zip//url.js
declare namespace ಠ_ಠ.clutz {
  type URLSearchParamsTupleType = string [] | null ;
}
// Generated from externs.zip//w3c_abort.js
declare namespace ಠ_ಠ.clutz {
  class AbortController {
    abort ( ) : void ;
    signal : AbortSignal ;
  }
}
// Generated from externs.zip//w3c_abort.js
declare namespace ಠ_ಠ.clutz {
  interface AbortSignal extends GlobalEventTarget {
    aborted : boolean ;
    onabort : ( (a : GlobalEvent ) => any ) | null ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type AudioConfiguration = { bitrate ? : number , channels ? : any , contentType : string , samplerate ? : number , spatialRendering ? : boolean } ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type ColorGamut = string ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type HdrMetadataType = string ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type KeySystemTrackConfiguration = { encryptionScheme ? : string , robustness ? : string } ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaCapabilities {
    decodingInfo (configuration : MediaDecodingConfiguration ) : Promise < MediaCapabilitiesDecodingInfo > ;
    encodingInfo (configuration : MediaEncodingConfiguration ) : Promise < MediaCapabilitiesEncodingInfo > ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaCapabilitiesDecodingInfo extends MediaCapabilitiesInfo {
    configuration : MediaDecodingConfiguration ;
    keySystemAccess : MediaKeySystemAccess | null ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaCapabilitiesEncodingInfo extends MediaCapabilitiesInfo {
    configuration : MediaEncodingConfiguration ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaCapabilitiesInfo {
    powerEfficient : boolean ;
    smooth : boolean ;
    supported : boolean ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type MediaCapabilitiesKeySystemConfiguration = { audio ? : ಠ_ಠ.clutz.KeySystemTrackConfiguration , distinctiveIdentifier ? : string , initDataType ? : string , keySystem : string , persistentState ? : string , sessionTypes ? : string [] , video ? : ಠ_ಠ.clutz.KeySystemTrackConfiguration } ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaConfiguration {
    audio ? : ಠ_ಠ.clutz.AudioConfiguration ;
    video ? : ಠ_ಠ.clutz.VideoConfiguration ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaDecodingConfiguration extends MediaConfiguration {
    keySystemConfiguration ? : ಠ_ಠ.clutz.MediaCapabilitiesKeySystemConfiguration ;
    type : string ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type MediaDecodingType = string ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  interface MediaEncodingConfiguration extends MediaConfiguration {
    type : string ;
  }
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type MediaEncodingType = string ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type TransferFunction = string ;
}
// Generated from externs.zip//w3c_mediacapabilities.js
declare namespace ಠ_ಠ.clutz {
  type VideoConfiguration = { bitrate : number , colorGamut ? : string , contentType : string , framerate : number , hasAlphaChannel ? : boolean , hdrMetadataType ? : string , height : number , transferFunction ? : string , width : number } ;
}
// Generated from externs.zip//w3c_navigation_timing.js
declare namespace ಠ_ಠ.clutz {
  /**
   * https://wicg.github.io/largest-contentful-paint/#largestcontentfulpaint
   */
  class LargestContentfulPaint extends PerformanceEntry {
    element : GlobalElement | null ;
    id : string ;
    loadTime : number ;
    renderTime : number ;
    size : number ;
    url : string ;
  }
}
// Generated from externs.zip//w3c_navigation_timing.js
declare namespace ಠ_ಠ.clutz {
  /**
   * https://wicg.github.io/layout-instability/#sec-layout-shift
   */
  class LayoutShift extends PerformanceEntry {
    hadRecentInput : boolean ;
    lastInputTime : number ;
    value : number ;
  }
}
// Generated from externs.zip//w3c_navigation_timing.js
declare namespace ಠ_ಠ.clutz {
  /**
   * https://wicg.github.io/event-timing/#sec-performance-event-timing
   */
  class PerformanceEventTiming extends PerformanceEntry {
    cancelable : boolean ;
    processingEnd : number ;
    processingStart : number ;
  }
}
// Generated from externs.zip//w3c_navigation_timing.js
declare namespace ಠ_ಠ.clutz {
  /**
   * https://w3c.github.io/paint-timing/#sec-PerformancePaintTiming
   */
  class PerformancePaintTiming extends PerformanceEntry {
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface AddressErrors {
    addressLine ? : string ;
    city ? : string ;
    country ? : string ;
    dependentLocality ? : string ;
    organization ? : string ;
    phone ? : string ;
    postalCode ? : string ;
    recipient ? : string ;
    region ? : string ;
    sortingCode ? : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface AddressInit {
    addressLine ? : string [] ;
    city ? : string ;
    country ? : string ;
    dependentLocality ? : string ;
    organization ? : string ;
    phone ? : string ;
    postalCode ? : string ;
    recipient ? : string ;
    region ? : string ;
    sortingCode ? : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  class MerchantValidationEvent extends GlobalEvent {
    constructor (type : string , eventInitDict ? : MerchantValidationEventInit ) ;
    complete (merchantSessionPromise : Promise < undefined > ) : void ;
    methodName : string ;
    validationURL : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface MerchantValidationEventInit extends EventInit {
    methodName ? : string ;
    validationURL ? : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PayerErrors {
    email ? : string ;
    name ? : string ;
    phone ? : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PaymentDetailsBase {
    displayItems ? : PaymentItem [] ;
    modifiers ? : PaymentDetailsModifier [] ;
    shippingOptions ? : PaymentShippingOption [] ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PaymentDetailsInit extends PaymentDetailsBase {
    id ? : string ;
    total : PaymentItem ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PaymentDetailsUpdate extends PaymentDetailsBase {
    error ? : string ;
    payerErrors ? : PayerErrors ;
    paymentMethodErrors ? : GlobalObject ;
    shippingAddressErrors ? : AddressErrors ;
    total ? : PaymentItem ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  class PaymentMethodChangeEvent extends PaymentRequestUpdateEvent {
    constructor (type : string , eventInitDict ? : PaymentMethodChangeEventInit ) ;
    methodDetails : GlobalObject | null ;
    methodName : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PaymentMethodChangeEventInit extends PaymentRequestUpdateEventInit {
    methodDetails ? : GlobalObject | null ;
    methodName ? : string ;
  }
}
// Generated from externs.zip//w3c_payment_request.js
declare namespace ಠ_ಠ.clutz {
  interface PaymentValidationErrors {
    error ? : string ;
    payer ? : PayerErrors ;
    paymentMethod ? : GlobalObject ;
    shippingAddress ? : AddressErrors ;
  }
}
// Generated from externs.zip//w3c_pointerlock.js
declare namespace ಠ_ಠ.clutz {
  /**
   * TODO(bradfordcsmith): update the link when PR is merged
   */
  interface PointerLockOptions {
    unadjustedMovement ? : boolean ;
  }
}
// Generated from externs.zip//w3c_rtc.js
declare namespace ಠ_ಠ.clutz {
  class BlobEvent extends GlobalEvent {
    constructor (type : string , eventInitDict : { data : Blob , timecode ? : number } ) ;
    data : Blob ;
    timecode : number ;
  }
}
// Generated from externs.zip//w3c_rtc.js
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
// Generated from externs.zip//w3c_rtc.js
declare namespace ಠ_ಠ.clutz {
  /**
   * Possible values are "sendrecv", "sendonly", "recvonly", and "inactive".
   */
  type RTCRtpTransceiverDirection = string ;
}
// Generated from externs.zip//w3c_rtc.js
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
// Generated from externs.zip//w3c_trusted_types.js
declare namespace ಠ_ಠ.clutz {
  let TrustedTypePolicyOptions : PrivateType;
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class Animation implements GlobalEventTarget {
    constructor (effect ? : AnimationEffectReadOnly | null , timeline ? : AnimationTimeline | null ) ;
    addEventListener < THIS = any > (type : string , listener : EventListener | null | ( (this : THIS , a : GlobalEvent ) => any ) , options ? : boolean | AddEventListenerOptions ) : void ;
    cancel ( ) : void ;
    currentTime : number ;
    dispatchEvent (evt : GlobalEvent ) : boolean ;
    effect : AnimationEffectReadOnly | null ;
    finish ( ) : void ;
    finished : Promise < undefined > ;
    id : string ;
    oncancel : ( (a : GlobalEvent ) => any ) | null ;
    onfinish : ( (a : GlobalEvent ) => any ) | null ;
    pause ( ) : void ;
    play ( ) : void ;
    playState : string ;
    playbackRate : number ;
    ready : Promise < undefined > ;
    removeEventListener < THIS = any > (type : string , listener : EventListener | null | ( (this : THIS , a : GlobalEvent ) => any ) , options ? : boolean | EventListenerOptions ) : void ;
    reverse ( ) : void ;
    startTime : number ;
    timeline : AnimationTimeline ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface AnimationEffectReadOnly {
    getComputedTiming ( ) : ComputedTimingProperties ;
    timing : AnimationEffectTiming ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface AnimationEffectTiming extends AnimationEffectTimingReadOnly {
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface AnimationEffectTimingProperties {
    delay ? : number ;
    direction ? : string ;
    duration ? : number | string ;
    easing ? : string ;
    endDelay ? : number ;
    fill ? : string ;
    iterationStart ? : number ;
    iterations ? : number ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface AnimationEffectTimingReadOnly {
    delay : number ;
    direction : string ;
    duration : number | string ;
    easing : string ;
    endDelay : number ;
    fill : string ;
    iterationStart : number ;
    iterations : number ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface AnimationTimeline {
    currentTime : number | null ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface ComputedTimingProperties extends AnimationEffectTimingProperties {
    activeDuration : number ;
    currentIteration : number | null ;
    endTime : number ;
    localTime : number | null ;
    progress : number | null ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class DocumentTimeline implements AnimationTimeline {
    currentTime : number | null ;
    getAnimations ( ) : Animation [] ;
    play (effect : AnimationEffectReadOnly ) : Animation ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class GroupEffect implements AnimationEffectReadOnly {
    constructor (children : AnimationEffectReadOnly [] , timing ? : AnimationEffectTimingProperties | null ) ;
    children : AnimationEffectReadOnly [] ;
    getComputedTiming ( ) : ComputedTimingProperties ;
    timing : AnimationEffectTiming ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface KeyframeAnimationOptions extends KeyframeEffectOptions {
    id ? : string ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class KeyframeEffect extends KeyframeEffectReadOnly {
    constructor (target : GlobalElement | null , frames : { [ key: string ]: any } [] | { [ key: string ]: any [] } , options ? : number | AnimationEffectTimingProperties | null ) ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  interface KeyframeEffectOptions extends AnimationEffectTimingProperties {
    /**
     * Possible values: 'replace', 'add', 'accumulate'
     */
    composite ? : string ;
    /**
     * Possible values: 'replace', 'accumulate'
     */
    iterationComposite ? : string ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class KeyframeEffectReadOnly implements AnimationEffectReadOnly {
    constructor (target : GlobalElement | null , frames : { [ key: string ]: any } [] | { [ key: string ]: any [] } , options ? : number | AnimationEffectTimingProperties | null ) ;
    getComputedTiming ( ) : ComputedTimingProperties ;
    onsample ? : ( (a : number , b : KeyframeEffect , c : Animation ) => any ) | null ;
    target : GlobalElement | null ;
    timing : AnimationEffectTiming ;
  }
}
// Generated from externs.zip//web_animations.js
declare namespace ಠ_ಠ.clutz {
  class SequenceEffect implements AnimationEffectReadOnly {
    constructor (children : AnimationEffectReadOnly [] , timing ? : AnimationEffectTimingProperties | null ) ;
    children : AnimationEffectReadOnly [] ;
    getComputedTiming ( ) : ComputedTimingProperties ;
    timing : AnimationEffectTiming ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz {
  type MemoryDescriptor = { initial : number , maximum ? : number } ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz {
  type TableDescriptor = { element : string , initial : number , maximum ? : number } ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz {
  type TableFunction = ( ...a : any [] ) => any ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class CompileError extends GlobalError {
    constructor ( ) ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class Instance {
    constructor (moduleObject : ಠ_ಠ.clutz.WebAssembly.Module , importObject ? : GlobalObject | null ) ;
    exports : any ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class LinkError extends GlobalError {
    constructor ( ) ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class Memory {
    constructor (memoryDescriptor : ಠ_ಠ.clutz.MemoryDescriptor ) ;
    buffer : ArrayBuffer ;
    grow (delta : number ) : number ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class Module {
    constructor (bytes : ArrayBuffer | ArrayBufferView ) ;
    static customSections (moduleObject : ಠ_ಠ.clutz.WebAssembly.Module , sectionName : string ) : ArrayBuffer [] ;
    static exports (moduleObject : ಠ_ಠ.clutz.WebAssembly.Module ) : { kind : string , name : string } [] ;
    static imports (moduleObject : ಠ_ಠ.clutz.WebAssembly.Module ) : { kind : string , module : string , name : string } [] ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class RuntimeError extends GlobalError {
    constructor ( ) ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  class Table {
    constructor (tableDescriptor : ಠ_ಠ.clutz.TableDescriptor ) ;
    get (index : number ) : ಠ_ಠ.clutz.TableFunction ;
    grow (delta : number ) : number ;
    length : number ;
    set (index : number , value : ( ಠ_ಠ.clutz.TableFunction ) | null ) : void ;
  }
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  function compile (bytes : ArrayBuffer | ArrayBufferView ) : Promise < ಠ_ಠ.clutz.WebAssembly.Module > ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  function compileStreaming (moduleStream : Promise < Response > ) : Promise < ಠ_ಠ.clutz.WebAssembly.Module > ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  function instantiate (moduleObject : ArrayBuffer | ArrayBufferView , importObject ? : GlobalObject | null ) : Promise < { instance : ಠ_ಠ.clutz.WebAssembly.Instance , module : ಠ_ಠ.clutz.WebAssembly.Module } > ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  function instantiateStreaming (moduleStream : Promise < Response > , importObject ? : GlobalObject | null ) : Promise < { instance : ಠ_ಠ.clutz.WebAssembly.Instance , module : ಠ_ಠ.clutz.WebAssembly.Module } > ;
}
// Generated from externs.zip//webassembly.js
declare namespace ಠ_ಠ.clutz.WebAssembly {
  function validate (bytes : ArrayBuffer | ArrayBufferView ) : boolean ;
}
// Generated from externs.zip//wicg_uach.js
declare namespace ಠ_ಠ.clutz {
  interface NavigatorUABrandVersion {
    brand : string ;
    version : string ;
  }
}
// Generated from externs.zip//wicg_uach.js
declare namespace ಠ_ಠ.clutz {
  interface NavigatorUAData {
    brands : string [] ;
    getHighEntropyValues (a : string [] ) : Promise < UADataValues > ;
    mobile : boolean ;
  }
}
// Generated from externs.zip//wicg_uach.js
declare namespace ಠ_ಠ.clutz {
  interface UADataValues {
    architecture : string ;
    model : string ;
    platform : string ;
    platformVersion : string ;
    uaFullVersion : string ;
  }
}
