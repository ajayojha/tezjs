import { commonContainer, CommonPathResolver } from '@tezjs/common';
import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'
import { tezGenBundle } from '../domain/plugins/tez-gen-bundle';
import { tez } from "../domain/tez";
import { BLANK } from './core.const';
export const VITE_SERVER_CONFIG = (config?:UserConfig)=> {
  const pathResolver = new CommonPathResolver();
  return {
    root:commonContainer.buildOptions.rootDir,
    logLevel: 'info',
    envDir:'environments',
    resolve:{
      alias:[
        {find:'#client-env',replacement:`/node_modules/.cache/tez/client-env.ts`},
        {find:'#server-env',replacement:"/node_modules/.cache/tez/server-env.ts"},
        { find: '/tez.ts', replacement: pathResolver.tezTsPath },
        { find: '#add-lib', replacement: "/add-lib.ts" },
        { find: '/@', replacement:pathResolver.getPath([commonContainer.buildOptions.rootDir,commonContainer.tezConfig.sourceCodePath || BLANK]) },
        { find: '/tez', replacement: pathResolver.cachePath }
      ]
    },
    ssr: {
      external: ["@tezjs/vue"]
    },
    optimizeDeps: {
      entries: [
        pathResolver.tezTsPath
      ],
      include: ['vue']
    },
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    build: {
      rollupOptions: {
        output: {
        entryFileNames: `assets/[name].${commonContainer.buildOptions.buildVersion}.js`,
        chunkFileNames: `assets/[name].${commonContainer.buildOptions.buildVersion}.js`,
        assetFileNames: `assets/[name].${commonContainer.buildOptions.buildVersion}.[ext]`
        }
      }
      },
      plugins: [vue(),tez(),tezGenBundle()]
  }
}