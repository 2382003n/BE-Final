import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('posts/:postId/comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request (Validation Error).' })
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentService.create(+postId, createCommentDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiResponse({ status: 200, description: 'Return all comments.' })
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(+postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiResponse({ status: 200, description: 'Return the comment.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  findOne(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentService.findOne(+postId, +id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  update(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    return this.commentService.update(+postId, +id, updateCommentDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  remove(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.commentService.remove(+postId, +id, req.user.id);
  }
} 