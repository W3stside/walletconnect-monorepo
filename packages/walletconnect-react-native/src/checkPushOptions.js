//
//  Checks Push Options are present or valid type
//
export default function checkPushOptions(opts) {
  if (!opts.push || typeof opts.push !== 'object') {
    return null
  }

  const push = opts.push

  const supportedTypes = ['fcm', 'apn']
  const supportedString = supportedTypes.reduce(
    (a, b, i) => (i === 0 ? b : a + `, ${b}`),
    ''
  )

  if (!push.type || typeof push.type !== 'string') {
    throw new Error('Push type option is missing or invalid')
  } else if (!supportedTypes.includes(push.type.toLowerCase())) {
    throw new Error(
      `Push type must be one of the following: ${supportedString}`
    )
  }

  if (!push.token || typeof push.token !== 'string') {
    throw new Error('Push token option is missing or invalid')
  }

  if (!push.webhook || typeof push.webhook !== 'string') {
    throw new Error('Push webhook option is missing or invalid')
  }

  return push
}
