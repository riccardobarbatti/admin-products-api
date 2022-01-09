import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        //o PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn:'1 day' },
        }),
    ],
    exports: [
        JwtModule
    ]
})
export class CommonModule {}
