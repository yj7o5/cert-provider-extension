## Certificates Provider Extension

_Provide certificates from external source vs importing directly on to users personal store_

### Goal

Provide user the ability to retrieve sites certificates from an external source vs setting on users personal store. 
This can remove user having to manually upload/import certificates to users personal cert store and selecting from a list of many for a
particular site. Given a set of URLs for which to keep this extension, it will load based on the provided store to retrieve certificates and then 
populate on-the-fly, making it easier for selecting a cert for the site.

### Roadmap
- [ ] Init setup 
- [ ] A place to set urls for monitoring
- [ ] A place to set the data store containing users certificates