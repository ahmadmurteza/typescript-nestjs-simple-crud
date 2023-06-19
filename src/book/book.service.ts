import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find()
        return books;
    }

    async create(book: Book): Promise<Book> {
        const result = await this.bookModel.create(book)
        return result;
    }

    async findById(id: string): Promise<Book> {
        const result = await this.bookModel.findById(id)

        if (!result) {
            throw new NotFoundException('Book not found!')
        }

        return result;
    }

    async update(id: string, book: Book): Promise<Book> {
        const result = await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });

        if (!result) {
            throw new NotFoundException('Failed updated book!')
        }
        
        return result;
    }

    async delete(id: string): Promise<Book> {
        const result = await this.bookModel.findByIdAndDelete(id)

        if (!result) {
            throw new NotFoundException('Failed book delete!')
        }

        return result;
    }
}
