const Ride = require("../models/ride");

class ConnectedRides {
    from = {};
    to = {};

    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    async getConnectingRides() {
        const { allRides, locations, graph } = await this.createLocationGraph();
        const fromIndex = locations.findIndex(
            (loc) =>
                loc.longitude === this.from.longitude &&
                loc.latitude === this.from.latitude
        );
        const toIndex = locations.findIndex(
            (loc) =>
                loc.longitude === this.to.longitude &&
                loc.latitude === this.to.latitude
        );
        console.table(locations.map((loc) => loc.locationName))
        const { distance, parents } = this.dijkstra(graph, fromIndex);
        const path = this.calculatePathFromSourceToDestination(parents, fromIndex, toIndex);
        const rides = this.getRideFromPath(path, locations, allRides);
        console.log(rides);
        return rides;
    }

    async createLocationGraph() {
        const allRides = await this.getAllRides();
        const locations = this.extractLocationsFrom(allRides);
        const graph = this.createInitialGraphFor(locations);
        this.setGraphWeights(graph, allRides, locations);
        return { allRides, locations, graph };
    }

    async getAllRides() {
        const filters = this.getRideFilter();
        const rides = await Ride.find({ ...filters });
        return rides;
    }

    getRideFilter() {
        const { from, to } = this;
        const fromFilters = {
            "from.latitude": {},
            "from.longitude": {},
        };
        const toFilters = {
            "to.longitude": {},
            "to.latitude": {},
        };
        if (from.longitude < to.longitude) {
            fromFilters["from.longitude"]["$gte"] = from.longitude;
            toFilters["to.longitude"]["$lte"] = to.longitude;
        } else {
            fromFilters["from.longitude"]["$lte"] = from.longitude;
            toFilters["to.longitude"]["$gte"] = to.longitude;
        }
        if (from.latitude < to.latitude) {
            fromFilters["from.latitude"]["$gte"] = from.latitude;
            toFilters["to.latitude"]["$lte"] = to.latitude;
        } else {
            fromFilters["from.latitude"]["$lte"] = from.latitude;
            toFilters["to.latitude"]["$gte"] = to.latitude;
        }
        const filters = {
            $or: [fromFilters, toFilters],
        };
        return filters;
    }

    extractLocationsFrom(allRides) {
        const locations = [];
        for (const ride of allRides) {
            const fromParsed =
                locations.findIndex(
                    (loc) =>
                        loc.longitude === ride.from.longitude &&
                        loc.latitude === ride.from.latitude
                ) > -1;
            if (!fromParsed) {
                locations.push(ride.from);
            }
            const toParsed =
                locations.findIndex(
                    (loc) =>
                        loc.longitude === ride.to.longitude &&
                        loc.latitude === ride.to.latitude
                ) > -1;
            if (!toParsed) {
                locations.push(ride.to);
            }
        }
        return locations;
    }

    createInitialGraphFor(locations) {
        const graph = [];
        for (const _ of locations) {
            const row = [];
            for (const __ of locations) {
                row.push(0);
            }
            graph.push(row);
        }
        return graph;
    }

    setGraphWeights(graph, allRides, locations) {
        for (const ride of allRides) {
            const fromLocationIndex = locations.findIndex(
                (loc) =>
                    loc.longitude === ride.from.longitude &&
                    loc.latitude === ride.from.latitude
            );
            const toLocationIndex = locations.findIndex(
                (loc) =>
                    loc.longitude === ride.to.longitude &&
                    loc.latitude === ride.to.latitude
            );
            graph[fromLocationIndex][toLocationIndex] = 1;
        }
    }

    dijkstra(graph, source = 0) {
        const distance = new Array(graph.length);
        const visited = new Array(graph.length);
        const parents = new Array(graph.length);

        for (let i = 0; i < graph.length; i++) {
            distance[i] = Number.POSITIVE_INFINITY;
            visited[i] = false;
            parents[i] = -1;
        }

        distance[source] = 0;

        for (let i = 0; i < distance.length - 1; i++) {
            const minimum = this.minimumDistance(distance, visited);
            visited[minimum] = true;

            for (let j = 0; j < distance.length; j++) {
                if (
                    visited[j] === false &&
                    graph[minimum][j] !== 0 &&
                    distance[minimum] !== Number.POSITIVE_INFINITY &&
                    distance[minimum] + graph[i][j] < distance[j]
                ) {
                    distance[j] = distance[minimum] + graph[minimum][j];
                    parents[j] = minimum;
                }
            }
        }

        return { distance, parents };
    }

    minimumDistance(distance, visited) {
        let min = Number.POSITIVE_INFINITY;
        let minIndex = -1;

        for (let i = 0; i < distance.length; i++) {
            if (visited[i] === false && distance[i] <= min) {
                min = distance[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    calculatePathFromSourceToDestination(parents, fromIndex, toIndex) {
        const path = this.getPath(toIndex, parents);
        return path;
    }

    getPath(vertex, parents) {
        if (parents[vertex] === -1) {
            return [vertex];
        }
        const next = this.getPath(parents[vertex], parents);
        return [...next, vertex];
    }

    getRideFromPath(path, locations, allRides) {
        if (path.length === 0) {
            return [];
        }
        console.log(path);
        const ride = [];
        for (let locIndex = 0; locIndex < path.length - 1; locIndex++)  {
            const currentLocIndex = path[locIndex];
            const nextLocIndex = path[locIndex + 1];
            const currentLocation = locations[currentLocIndex];
            const nextLocation = locations[nextLocIndex];
            const rideFromCurrentToNext = allRides.find(
                ride => 
                ride.from.longitude === currentLocation.longitude && 
                ride.from.latitude === currentLocation.latitude && 
                ride.to.longitude === nextLocation.longitude && 
                ride.to.latitude === nextLocation.latitude
            )
            ride.push(rideFromCurrentToNext)
        }
        return ride;
    }
}

module.exports = ConnectedRides