"use strict";
// store.repository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = exports.findStoreById = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
const findStoreById = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.store.findUnique({
        where: {
            id: storeId,
        },
    });
});
exports.findStoreById = findStoreById;
const createStore = (regionId, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newStore = yield prisma.store.create({
        data: {
            regionId,
            name: data.name,
            address: data.address,
            category: (_a = data.category) !== null && _a !== void 0 ? _a : "",
        },
    });
    return newStore;
});
exports.createStore = createStore;
