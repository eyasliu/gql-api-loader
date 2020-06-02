import gqlConfig from '../src/config'

gqlConfig({
  endpoint: 'http://localhost:9000/gql',
  credentials: 'include',
})

import user from './gql/user.graphql'

console.log(user)

async function main() {
  const me = await user.check()
  console.log(me)
}

main()