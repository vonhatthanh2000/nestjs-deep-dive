import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalGuard } from '../common/guards/local-auth.guard';
import { NoteService } from './note.service';
import { CurrentUser } from '../common/decorators';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto';

@ApiBearerAuth()
@ApiTags('notes')
@UseGuards(LocalGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNotes(@CurrentUser() userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
  ) {
    return this.noteService.getNoteById(userId, noteId);
  }

  @Post()
  createNote(@CurrentUser('id') userId: number, @Body() dto: CreateNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Patch(':id')
  updateNote(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.noteService.editNote(userId, noteId, dto);
  }

  @Delete(':id')
  deleteNote(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) noteId: number,
  ) {
    return this.noteService.deleteNote(userId, noteId);
  }
}
