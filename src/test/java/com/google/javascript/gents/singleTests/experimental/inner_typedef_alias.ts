class Inner {}

export class Outer {}
type RenameInner = Inner;

// Technicaly we should also test Outer.Inner = Inner, but that produces
// a Closure error at the end of the gents run that we check against.
// It happens because when we flatten the alias collides with the original
// definition. That said, it does not crash gents.
// TODO(rado): detect that this is an alias for something that is about to
// be flattened and just don't emit.