import { TezConfig } from '@tezjs/types'
import { createTezServer } from './create-tez-server'
import { getPort } from 'get-port-please'
export function tzServer(tezConfig?:TezConfig,rootPath?:string){
  createTezServer(tezConfig,rootPath).then(async ({ app }) =>{
    const port = await getPort({ports:[tezConfig.port,...Array(50).fill(3001).map((fillValue, index) => fillValue + index)]});
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
}