import { Inject, Injectable } from "@nestjs/common";
import { LOCATION_REPOSITORY, PRINTER_REPOSITORY } from "src/common/contants";
import { Printer } from "../entities/printer.entity";
import { CreatePrinterDto } from "../dtos/create-printer.dtos";
import { Location } from "../entities/location.entity";


@Injectable()
export class PrinterService {
    constructor(
        @Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer,
        @Inject(LOCATION_REPOSITORY) private readonly locationRepository: typeof Location
    ) {};


    async create(payload: CreatePrinterDto) {
        const [location] = await this.locationRepository.findOrCreate({
            where: { 
                building: payload.building,
                floor: payload.floor,
                room: payload.room
            },

            defaults: { 
                building: payload.building,
                floor: payload.floor,
                room: payload.room
            }
        });


        const printer = await this.printerRepository.create({
            status: payload.status,
            A3PaperCount: payload.A3PaperCount,
            A4PaperCount: payload.A4PaperCount,
            A5PaperCount: payload.A5PaperCount,
            brand: payload.brand,
            model: payload.model,
            locationId: location.id
        });

        return printer;
    }
}