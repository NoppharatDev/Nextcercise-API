import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestsModule } from './quests/quests.module';
import { AdminsModule } from './admins/admins.module';
import { EventsModule } from './events/events.module';
import { CheckpointsModule } from './checkpoints/checkpoints.module';
import { PathsModule } from './paths/paths.module';
import { StreamFilesModule } from './stream-files/stream-files.module';
import { AuthsModule } from './auths/auths.module';
import { JoinEventsModule } from './join-events/join-events.module';
import { JoinEventListsModule } from './join-event-lists/join-event-lists.module';
import { StreamFileFindallModule } from './stream-file-findall/stream-file-findall.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(<string>process.env.POSTGRE_PORT),
      username: process.env.POSTGRE_USER,
      password: process.env.POSTGRE_PASSWORD,
      database: process.env.POSTGRE_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    QuestsModule,
    AdminsModule,
    EventsModule,
    CheckpointsModule,
    PathsModule,
    StreamFilesModule,
    AuthsModule,
    JoinEventsModule,
    JoinEventListsModule,
    StreamFileFindallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
