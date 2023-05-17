export interface RequestCommands {
  connect: number
  message: number
}

export interface ResponseCommands {
  connect: number
  close: number
}

export interface Cmd {
  req: RequestCommands
  res: ResponseCommands
}

export const cmd: Cmd = {
  req: {
    connect: 1001,
    message: 1002
  },
  res: {
    connect: 1,
    close: 2
  }
}
