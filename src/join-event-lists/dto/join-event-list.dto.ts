import { ApiProperty } from "@nestjs/swagger"

export class JoinEventListDto {
    @ApiProperty({type: String})
    eId: string
    @ApiProperty({type: Number})
    jeId: number
    @ApiProperty({type: Number})
    cpOrder: number
    @ApiProperty({type: Number})
    cpId: number
    @ApiProperty({type: Boolean})
    isSuccess: boolean
    @ApiProperty({type: String})
    createdAt: Date
    @ApiProperty({type: String})
    updatedAt: Date
}
