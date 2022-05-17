export interface PortValidator<Port, ValidatedPort> {
  validate(port: Port): ValidatedPort
}