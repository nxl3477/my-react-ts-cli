## 错误处理
### 开启css mdoule 编辑器报红线的解决办法
在项目中任意位置创建一个 `.ts` 文件, 填入以下内容

```ts
// 为了解决 css module 开启之后 css 报错问题
declare module '*.scss' { 
  const content: any; 
  export default content;
}
```