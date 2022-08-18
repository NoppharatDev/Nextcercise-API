import { ApiProperty } from "@nestjs/swagger"

export class EventDto {
    @ApiProperty({type: String})
    eId: string
    @ApiProperty({type: String})
    title: string
    @ApiProperty({type: Date})
    periodStart: Date;
    @ApiProperty({type: Date})
    periodEnd: Date;
    @ApiProperty({type: String})
    description: string;
    @ApiProperty({type: String})
    rewardId: string;
    @ApiProperty({type: String})
    hostCode: string;
    @ApiProperty({type: String})
    hostDetail: string;
    @ApiProperty({type: String})
    header: string;
    @ApiProperty({type: String})
    banner: string;
    @ApiProperty({type: String})
    visual: string;
    @ApiProperty({type: Boolean, default: false})
    isPublish: boolean;
    @ApiProperty({type: Boolean, default: false})
    isDraft: boolean;
    @ApiProperty({type: Boolean, default: false})
    isTrash: boolean;
    @ApiProperty({type: Boolean, default: false})
    isNoPath: boolean;
    @ApiProperty({type: String})
    createdAt: Date;
    @ApiProperty({type: String})
    updatedAt: Date;
}