const hostname = location.hostname
export let api = 'http://localhost:8080'

if (hostname.includes('210yy.cn') || hostname.includes('149.248.10.24')) {
  api = 'http://'+hostname
}