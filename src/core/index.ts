import fastifyNext from '@fastify/nextjs';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import { config } from '@/core/config';
import nextConfig from '@/next.config';

(async () => {
    dotenv.config();

    const server = Fastify({
        logger: true,
        pluginTimeout: config.isDevelopment ? 120_000 : undefined
    });

    server
        .register(fastifyNext, {
            dev: config.isDevelopment,
            hostname: config.serverHostname,
            port: config.serverPort,
            conf: nextConfig
        })
        .after(() => {
            server.next('*', (app, req, reply) => {
                const handle = app.getRequestHandler();
                return handle(req.raw, reply.raw).then(() => {
                    reply.hijack();
                });
            });
        });

    // Run the server!
    server.listen(
        { host: config.serverIP, port: config.serverPort },
        (err, address) => {
            if (err) {
                server.log.error(err);
                process.exit(1);
            }

            server.log.info(`Server is now listening on ${address}`);
        }
    );
})();
