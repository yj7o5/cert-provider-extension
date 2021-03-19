using System;

namespace Proxy.Service
{
    public class Cluster
    {
        public string Identifier { get; set; }

        public string HttpAddress { get; set; }

        public string WsAddress { get; set; }

        public Uri Certificate { get; set; }

        public string Passphrase { get; set; }
    }    
}