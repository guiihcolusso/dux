import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemVendaDto } from './dto/createItem.dto';
import { UpdateItemVendaDto } from './dto/updateItem.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  listAllItems() {
    return this.itemService.listAllItems();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.getItem(id);
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemVendaDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Put(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemVendaDto,
  ) {
    return this.itemService.updateItem(id, updateItemDto);
  }

  @Delete(':id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.deleteItem(id);
  }
}
