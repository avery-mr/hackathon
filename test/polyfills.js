import { TextDecoder, TextEncoder } from 'node:util'

// jsdom does not provide these, but react-router uses them at import time.
Object.assign(globalThis, { TextDecoder, TextEncoder })
