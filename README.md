## Certificates Provider Extension

_Provide certificates from external source vs importing directly on to users personal store_

### Goal

Provide user the ability to retrieve sites certificates from an external source vs setting on users personal store. 
This can remove user having to manually upload/import certificates to users personal cert store and selecting from a list of many for a
particular site. Given a set of URLs for which to keep this extension, it will load based on the provided store to retrieve certificates and then 
populate on-the-fly, making it easier for selecting a cert for the site.

##### TODO
Need to expirement the following. Chrome extension for providing the certs only works for Chrome OS which rules out Chrome extension from the game. 
The chrome WebRequest extension doesn't even allow to view the certificate details when request is made. The Firefox extension however does provide 
a way to get the security (TLS) details from a web request however it only provides a read-only access, you cannot set the certs on-flight. 
There might be a way to proxy the request through a proxy server that tacks on the appropriate client certificate therefore need to test out the following:

- [ ] Setup a dumb https site to use for quick testing with certs i.e. having the browser request for certificate
- [ ] Create the proxy service to re-route all the requests to upstream server and tack on the client certificate
- [ ] Create the Firefox extension with the hook to `proxy.webRequest` to proxy all the requests through the proxy service