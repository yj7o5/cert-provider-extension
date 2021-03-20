using System;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Proxy;
using AspNetCore.Proxy.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Proxy.Service
{
    public class MainController : ControllerBase
    {
        private Cluster[] Clusters;

        public MainController(IConfiguration configuration)
        {
            Clusters = configuration.GetSection("Clusters").Get<Cluster[]>();
        }

        [Route("/{**rest}")]
        public Task ProxyCatchAll(string rest)
        {
            var clusterId = Request.Headers["cluster"].FirstOrDefault()?.Trim();

            Console.WriteLine("Cluster Id", clusterId);

            var cluster = Clusters.FirstOrDefault(c => c.Identifier == clusterId);

            var httpUrl = $"{cluster.HttpAddress}/{rest}";
            var wsUrl = $"{cluster.WsAddress}/{rest}";
            var queryString = Request.QueryString.Value;

            if (!string.IsNullOrEmpty(queryString))
            {
                httpUrl = $"{httpUrl}{queryString}";
                wsUrl = $"{wsUrl}{queryString}";
            }

            var options = HttpProxyOptionsBuilder.Instance.WithHttpClientName(cluster.Identifier).Build();

            return this.ProxyAsync(httpUrl, wsUrl, options);
        }
    }
}