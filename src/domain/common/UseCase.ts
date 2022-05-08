export interface UseCase<Port, DTO> {
  execute(port: Port): Promise<DTO> 
}