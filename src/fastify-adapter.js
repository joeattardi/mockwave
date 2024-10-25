import chalk from 'chalk';
import Table from 'cli-table3';

export function createFastifyAdapter(server) {
    return {
        routes: {
            GET: [],
            POST: [],
            PUT: [],
            PATCH: [],
            DELETE: []
        },

        printRoutes() {
            const table = new Table({
                head: [chalk.cyanBright('Method'), chalk.cyanBright('Route')]
            });

            Object.entries(this.routes).forEach(([method, routes]) => {
                routes.forEach(route => {
                    table.push([method, route]);
                });
            });

            console.log(table.toString());
        },

        get(path, handler) {
            this.routes.GET.push(path);
            server.get(path, handler);
        },

        post(path, handler) {
            this.routes.POST.push(path);
            server.post(path, handler);
        },

        put(path, handler) {
            this.routes.PUT.push(path);
            server.put(path, handler);
        },

        patch(path, handler) {
            this.routes.PATCH.push(path);
            server.patch(path, handler);
        },

        delete(path, handler) {
            this.routes.DELETE.push(path);
            server.delete(path, handler);
        }
    }
}
