using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security;
using System.Security.Cryptography.X509Certificates;
using AspNetCore.Proxy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

namespace Proxy.Service
{
    public class Startup
    {
        public Cluster[] Clusters { get; set; }

        public Startup(IConfiguration configuration)
        {
            Clusters = configuration.GetSection("Clusters").Get<Cluster[]>();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureHttpHandlers(services);

            services.AddRouting();
            services.AddProxies();
            services.AddControllers();
        }

        protected void ConfigureHttpHandlers(IServiceCollection services)
        {
            foreach(var cluster in Clusters)
            {
                services.AddHttpClient(cluster.Identifier)
                    .ConfigurePrimaryHttpMessageHandler(
                        () => new ScopedHttpClientHandler(cluster.Certificate, cluster.Passphrase)
                    );
            }
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }

        public class ScopedHttpClientHandler : HttpClientHandler
        {
            public ScopedHttpClientHandler(Uri certFile, string certPass)
            {
                AllowAutoRedirect = false;

                ClientCertificates.Add(GetCertificate(certFile, certPass));
            }

            private X509Certificate2 GetCertificate(Uri certFile, string certPass)
            {
                var password = certPass.Aggregate(new SecureString(), (secure, next) => 
                {
                    secure.AppendChar(next);
                    return secure;
                });

                var rawCert = File.ReadAllBytes(certFile.LocalPath);

                return new X509Certificate2(rawCert, password);
            }
        }
    }
}
