import { Inject, Injectable } from '@nestjs/common';
import {
  LOCATION_REPOSITORY,
  PRINTER_REPOSITORY,
  SEQUELIZE,
} from 'src/common/contants';
import { Printer } from '../entities/printer.entity';
import { CreatePrinterDto } from '../dtos/create-printer.dtos';
import { UpdatePrinterDto } from '../dtos/update-printer.dtos';
import { UpdatePaperAfterPrintingDto } from '../dtos/update-paper-after-printing.dtos';
import { Location } from '../entities/location.entity';
import { Sequelize, QueryTypes } from 'sequelize';
// import { DataSource } from 'typeorm';
// import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PrinterService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: typeof Sequelize,
    @Inject(PRINTER_REPOSITORY)
    private readonly printerRepository: typeof Printer,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: typeof Location,
  ) {}

  async create(payload: CreatePrinterDto) {
    const [location] = await this.locationRepository.findOrCreate({
      where: {
        building: payload.building,
        floor: payload.floor,
        room: payload.room,
      },

      defaults: {
        building: payload.building,
        floor: payload.floor,
        room: payload.room,
      },
    });

    const printer = await this.printerRepository.create({
      status: payload.status,
      A3PaperCount: payload.A3PaperCount,
      A4PaperCount: payload.A4PaperCount,
      A5PaperCount: payload.A5PaperCount,
      brand: payload.brand,
      model: payload.model,
      locationId: location.id,
    });

    return printer;
  }
  async search(searchCriteria: any) {
      const validFields = [
        'id',
        'status',
        'A3PaperCount',
        'A4PaperCount',
        'A5PaperCount',
        'brand',
        'model',
        'building',
        'floor',
        'room',
        'lastUpdate',
      ];
      // Kiểm tra xem có trường nào không hợp lệ không
      const invalidFields = Object.keys(searchCriteria).filter(
        (key) => !validFields.includes(key),
      );
      if (invalidFields.length > 0) {
        throw new Error(`Trường không hợp lệ: ${invalidFields.join(', ')}`);
      }
      let sql = `
        SELECT 
          printers.id,
          printers.status,
          printers.A3PaperCount,
          printers.A4PaperCount,
          printers.A5PaperCount,
          printers.brand,
          printers.model,
          printers.createdAt,
          printers.updatedAt,
          locations.building,
          locations.floor,
          locations.room
        FROM printers
        JOIN locations ON printers.locationId = locations.id
      `;
      const whereClauses: string[] = [];
      const replacements: any[] = [];

      // Thêm điều kiện WHERE cho các tham số tìm kiếm
      if (searchCriteria.building) {
        whereClauses.push('locations.building = ?');
        replacements.push(searchCriteria.building);
      }
      if (searchCriteria.floor) {
        whereClauses.push('locations.floor = ?');
        replacements.push(searchCriteria.floor);
      }
      if (searchCriteria.room) {
        whereClauses.push('locations.room = ?');
        replacements.push(searchCriteria.room);
      }
      if (searchCriteria.brand) {
        whereClauses.push('printers.brand = ?');
        replacements.push(searchCriteria.brand);
      }
      if (searchCriteria.status) {
        whereClauses.push('printers.status = ?');
        replacements.push(searchCriteria.status);
      }
      if (searchCriteria.model) {
        whereClauses.push('printers.model =?');
        replacements.push(searchCriteria.model);
      }
      if (searchCriteria.A3PaperCount) {
        whereClauses.push('printers.A3PaperCount = ?');
        replacements.push(Number(searchCriteria.A3PaperCount));
      }
      if (searchCriteria.A4PaperCount) {
        whereClauses.push('printers.A4PaperCount = ?');
        replacements.push(Number(searchCriteria.A4PaperCount));
      }
      if (searchCriteria.A5PaperCount) {
        whereClauses.push('printers.A5PaperCount = ?');
        replacements.push(Number(searchCriteria.A5PaperCount));
      }
      // Nếu có điều kiện WHERE, thêm vào câu lệnh SQL
      if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
      }

      if( searchCriteria.lastUpdate == 'false') {
        sql += 'ORDER BY printers.updatedAt ASC';
      } else {
        sql += 'ORDER BY printers.updatedAt DESC';
      }

      sql += ';';

      const [results] = await this.printerRepository.sequelize.query(sql, {
        replacements,
        type: QueryTypes.RAW,
      });
      return results;
  }
  async searchToPrint(searchCriteria: any) {
      const validFields = [
        'id',
        'status',
        'A3PaperCount',
        'A4PaperCount',
        'A5PaperCount',
        'brand',
        'model',
        'building',
        'floor',
        'room',
      ];
      // Kiểm tra xem có trường nào không hợp lệ không
      const invalidFields = Object.keys(searchCriteria).filter(
        (key) => !validFields.includes(key),
      );
      if (invalidFields.length > 0) {
        throw new Error(`Trường không hợp lệ: ${invalidFields.join(', ')}`);
      }
      let sql = `
        SELECT 
          printers.id,
          printers.status,
          printers.A3PaperCount,
          printers.A4PaperCount,
          printers.A5PaperCount,
          printers.brand,
          printers.model,
          locations.building,
          locations.floor,
          locations.room
        FROM printers
        JOIN locations ON printers.locationId = locations.id
      `;
      const whereClauses: string[] = [];
      const replacements: any[] = [];

      // Thêm điều kiện WHERE cho các tham số tìm kiếm
      if (searchCriteria.building) {
        whereClauses.push('locations.building = ?');
        replacements.push(searchCriteria.building);
      }
      if (searchCriteria.floor) {
        whereClauses.push('locations.floor = ?');
        replacements.push(searchCriteria.floor);
      }
      if (searchCriteria.room) {
        whereClauses.push('locations.room = ?');
        replacements.push(searchCriteria.room);
      }
      if (searchCriteria.brand) {
        whereClauses.push('printers.brand = ?');
        replacements.push(searchCriteria.brand);
      }
      if (searchCriteria.status) {
        whereClauses.push('printers.status = ?');
        replacements.push(searchCriteria.status);
      }
      if (searchCriteria.model) {
        whereClauses.push('printers.model =?');
        replacements.push(searchCriteria.model);
      }
      if (searchCriteria.A3PaperCount) {
        whereClauses.push('printers.A3PaperCount >= ?');
        replacements.push(Number(searchCriteria.A3PaperCount));
      }
      if (searchCriteria.A4PaperCount) {
        whereClauses.push('printers.A4PaperCount >= ?');
        replacements.push(Number(searchCriteria.A4PaperCount));
      }
      if (searchCriteria.A5PaperCount) {
        whereClauses.push('printers.A5PaperCount >= ?');
        replacements.push(Number(searchCriteria.A5PaperCount));
      }
      // Nếu có điều kiện WHERE, thêm vào câu lệnh SQL
      if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
      }
      sql += ';';

      const [results] = await this.printerRepository.sequelize.query(sql, {
        replacements,
        type: QueryTypes.RAW,
      });
      return results;
  }
  async count(searchCriteria: any) {
      const validFields = [
        'id',
        'status',
        'A3PaperCount',
        'A4PaperCount',
        'A5PaperCount',
        'brand',
        'model',
        'building',
        'floor',
        'room',
      ];
      // Kiểm tra xem có trường nào không hợp lệ không
      const invalidFields = Object.keys(searchCriteria).filter(
        (key) => !validFields.includes(key),
      );
      if (invalidFields.length > 0) {
        throw new Error(`Trường không hợp lệ: ${invalidFields.join(', ')}`);
      }
      let sql = `
        SELECT 
          printers.id,
          printers.status,
          printers.A3PaperCount,
          printers.A4PaperCount,
          printers.A5PaperCount,
          printers.brand,
          printers.model,
          locations.building,
          locations.floor,
          locations.room
        FROM printers
        JOIN locations ON printers.locationId = locations.id
      `;
      const whereClauses: string[] = [];
      const replacements: any[] = [];

      // Thêm điều kiện WHERE cho các tham số tìm kiếm
      if (searchCriteria.building) {
        whereClauses.push('locations.building = ?');
        replacements.push(searchCriteria.building);
      }
      if (searchCriteria.floor) {
        whereClauses.push('locations.floor = ?');
        replacements.push(searchCriteria.floor);
      }
      if (searchCriteria.room) {
        whereClauses.push('locations.room = ?');
        replacements.push(searchCriteria.room);
      }
      if (searchCriteria.brand) {
        whereClauses.push('printers.brand = ?');
        replacements.push(searchCriteria.brand);
      }
      if (searchCriteria.status) {
        whereClauses.push('printers.status = ?');
        replacements.push(searchCriteria.status);
      }
      if (searchCriteria.model) {
        whereClauses.push('printers.model =?');
        replacements.push(searchCriteria.model);
      }
      if (searchCriteria.A3PaperCount) {
        whereClauses.push('printers.A3PaperCount >= ?');
        replacements.push(Number(searchCriteria.A3PaperCount));
      }
      if (searchCriteria.A4PaperCount) {
        whereClauses.push('printers.A4PaperCount >= ?');
        replacements.push(Number(searchCriteria.A4PaperCount));
      }
      if (searchCriteria.A5PaperCount) {
        whereClauses.push('printers.A5PaperCount >= ?');
        replacements.push(Number(searchCriteria.A5PaperCount));
      }
      // Nếu có điều kiện WHERE, thêm vào câu lệnh SQL
      if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
      }
      sql += ';';

      const [results] = await this.printerRepository.sequelize.query(sql, {
        replacements,
        type: QueryTypes.RAW,
      });
      return results.length;
  }
  async update(id: string, updatePrinterDto: UpdatePrinterDto) {
      const validFields = [
        'id',
        'status',
        'A3PaperCount',
        'A4PaperCount',
        'A5PaperCount',
        'brand',
        'model',
        'building',
        'floor',
        'room',
      ];
      // Kiểm tra xem có trường nào không hợp lệ không
      const invalidFields = Object.keys(updatePrinterDto).filter(
        (key) => !validFields.includes(key),
      );
      if (invalidFields.length > 0) {
        throw new Error(`Trường không hợp lệ: ${invalidFields.join(', ')}`);
      }
      // Tìm máy in theo id
      const printer = await this.printerRepository.findOne({ where: { id } });
      if (!printer) {
        return null; // Không tìm thấy máy in với id này
      }

      const location = await this.locationRepository.findOne({
        where: { id: printer.locationId },
      });

      let check_location = false;

      // Kiểm tra nếu có trường location nào trong dto được cập nhật
      if (
        updatePrinterDto.building !== undefined ||
        updatePrinterDto.floor !== undefined ||
        updatePrinterDto.room !== undefined
      ) {
        // Kiểm tra xem có thay đổi gì so với location hiện tại không
        if (
          (updatePrinterDto.building !== undefined &&
            updatePrinterDto.building !== location.building) ||
          (updatePrinterDto.floor !== undefined &&
            updatePrinterDto.floor !== location.floor) ||
          (updatePrinterDto.room !== undefined &&
            updatePrinterDto.room !== location.room)
        ) {
          check_location = true;
        }
      }

      // Nếu có sự thay đổi location, xử lý tạo mới hoặc tìm location hiện tại
      if (check_location) {
        const searching = await this.locationRepository.findOne({
          where: {
            building: updatePrinterDto.building ?? location.building,
            floor: updatePrinterDto.floor ?? location.floor,
            room: updatePrinterDto.room ?? location.room,
          },
        });

        let locationId;
        if (searching) {
          // Nếu location đã tồn tại, dùng locationId hiện tại
          locationId = searching.id;
        } else {
          // Nếu location không tồn tại, tạo mới location
          const new_location = await this.locationRepository.create({
            building: updatePrinterDto.building ?? location.building,
            floor: updatePrinterDto.floor ?? location.floor,
            room: updatePrinterDto.room ?? location.room,
          });
          locationId = new_location.id; // Lấy id từ location mới
        }

        // Cập nhật locationId của máy in
        printer.locationId = locationId;
      }

      // Cập nhật thông tin máy in
      const updatedPrinter = await this.printerRepository.update(
        {
          status: updatePrinterDto.status ?? printer.status,
          A3PaperCount: updatePrinterDto.A3PaperCount ?? printer.A3PaperCount,
          A4PaperCount: updatePrinterDto.A4PaperCount ?? printer.A4PaperCount,
          A5PaperCount: updatePrinterDto.A5PaperCount ?? printer.A5PaperCount,
          brand: updatePrinterDto.brand ?? printer.brand,
          model: updatePrinterDto.model ?? printer.model,
          locationId: printer.locationId, // Đảm bảo locationId đã được cập nhật
        },
        {
          where: { id: printer.id }, // Đặt điều kiện cho update
        },
      );

      return updatedPrinter; // Trả về kết quả sau khi cập nhật
  }
  async updatePaper(id: string, updatePaper: UpdatePaperAfterPrintingDto) {
      const validFields = [
        'id',
        'A3PaperCount',
        'A4PaperCount',
        'A5PaperCount',
      ];
      // Kiểm tra xem có trường nào không hợp lệ không
      const invalidFields = Object.keys(updatePaper).filter(
        (key) => !validFields.includes(key),
      );
      if (invalidFields.length > 0) {
        throw new Error(`Trường không hợp lệ: ${invalidFields.join(', ')}`);
      }
      // Tìm máy in theo id
      const printer = await this.printerRepository.findOne({ where: { id } });
      if (!printer) {
        return null; // Không tìm thấy máy in với id này
      }
      const updated_data = {
        A3PaperCount: printer.A3PaperCount,
        A4PaperCount: printer.A4PaperCount,
        A5PaperCount: printer.A5PaperCount,
      };
      if (updatePaper.A3PaperCount !== undefined) {
        updated_data.A3PaperCount -= updatePaper.A3PaperCount;
      }
      if (updatePaper.A4PaperCount !== undefined) {
        updated_data.A4PaperCount -= updatePaper.A4PaperCount;
      }
      if (updatePaper.A5PaperCount !== undefined) {
        updated_data.A5PaperCount -= updatePaper.A5PaperCount;
      }
      if (
        updated_data.A3PaperCount < 0 ||
        updated_data.A4PaperCount < 0 ||
        updated_data.A5PaperCount < 0
      ) {
        throw new Error('Không thể cập nhật: Số lượng giấy không được âm');
      }
      
      const updatedPrinter = await this.printerRepository.update(updated_data, {
        where: { id: printer.id }, 
      });
      return updatedPrinter; 
  }
  async delete(deleteCriteria: any) {
      if (!deleteCriteria.id) {
        return 1;
      }
      const printersToDelete = await this.printerRepository.findAll({
        where: { id: deleteCriteria.id },
      });
      if (!printersToDelete || printersToDelete.length === 0) {
        return 2;
      }
      for (const printer of printersToDelete) {
        await this.printerRepository.destroy({
          where: { id: printer.id },
        });
      }
      return 3;
    } 
}