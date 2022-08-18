import { ApiProperty } from "@nestjs/swagger";

export class QuestDto {
    @ApiProperty({type: Number})
    qId: number;
    @ApiProperty({type: String})
    title: string
    @ApiProperty({type: String})
    description: string
    @ApiProperty({type: String})
    activityType: string
    @ApiProperty({type: String})
    goalUnit: string
    @ApiProperty({type: Number})
    goalValue: number
    @ApiProperty({type: Date})
    createdAt: Date
    @ApiProperty({type: Date})
    updatedAt: Date
    @ApiProperty({type: Boolean, default: false})
    isTrash: boolean;
}