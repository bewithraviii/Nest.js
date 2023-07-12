import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.services';

@Controller('messages')
export class MessagesController {
    
    messageService: MessagesService;

    constructor() {
        this.messageService = new MessagesService();
    }
    
    @Get()
    listMessages() {
       return this.messageService.findAll();
    }

    @Post()
    createMessages(@Body() body: CreateMessageDto) {
        return this.messageService.create(body.content)
    }

    @Get('/:id')
    async getMessages(@Param('id') id: string) {
        const message = await this.messageService.findOne(id);

        if(!message){
            throw new NotFoundException('Message Not Found');
        }
        return message;
    }
        


}
