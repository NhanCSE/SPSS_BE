import { LOCATION_REPOSITORY, PRINTER_REPOSITORY } from "src/common/contants";
import { Printer } from "./entities/printer.entity";
import { Location } from "./entities/location.entity";


export const printerProviders = [{
    provide: PRINTER_REPOSITORY,
    useValue: Printer
}, {
    provide: LOCATION_REPOSITORY,
    useValue: Location,
}]