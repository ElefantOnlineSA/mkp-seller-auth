export async function noCache(ctx: Context, next: () => Promise<any>) {
  //https://github.com/helmetjs/nocache
  ctx.set('Cache-Control', 'no-store')

  await next()
}
