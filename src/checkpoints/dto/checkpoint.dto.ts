import { ApiProperty } from "@nestjs/swagger";

export class CheckpointDto {
    @ApiProperty({type: String})
    eId: string
    @ApiProperty({type: String})
    cpId: string
    @ApiProperty({type: Number})
    qId: number
    @ApiProperty({type: String})
    name: string
    @ApiProperty({type: String})
    summary: string
    @ApiProperty({type: String})
    desciption: string
    @ApiProperty({type: Number})
    lat: number
    @ApiProperty({type: Number})
    long: number
    @ApiProperty({type: Number})
    length: number
    @ApiProperty({type: Number})
    positionX: number
    @ApiProperty({type: Number})
    positionY: number
    @ApiProperty({type: String})
    startFile: string
    @ApiProperty({type: String})
    resultFile: string
    // @ApiProperty({type: String})
    // backgroundFile: string
    @ApiProperty({type: Date})
    createdAt: Date
    @ApiProperty({type: Date})
    updatedAt: Date
}