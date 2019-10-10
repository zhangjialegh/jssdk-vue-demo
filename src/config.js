const hostname = location.hostname
export let api = 'http://127.0.0.1:8080'

if (hostname.includes('210yy.cn')) {
  api = 'https://'+hostname
} else if (hostname.includes('149.248.10.24')) {
  api = 'http://'+hostname
}