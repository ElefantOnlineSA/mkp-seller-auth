export async function validateRequest(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx

  ctx.state.params = params
  ctx.state.requestHeaders = ctx.headers

  await next()
}
