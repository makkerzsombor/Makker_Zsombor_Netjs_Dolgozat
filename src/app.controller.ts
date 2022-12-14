import {  Body, Controller,  Get,  Post,  Redirect,  Render,} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() {
    const [ rows ] = await db.execute(
      'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC'
      );

    return {
      macskak: rows
    };
  }

  //uj macska
  @Get('cats/new')
  @Render('form')
  newMacskaForm(){
    return {};
  }


  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() macska: MacskaDto){
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [ macska.szem_szin, macska.suly ]
    );
    return{
      url: '/',
    }
  }


}
