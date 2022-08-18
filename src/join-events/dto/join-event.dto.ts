import { ApiProperty } from "@nestjs/swagger"

export class JoinEventDto {
    @ApiProperty({type: String})
    eId: string
    @ApiProperty({type: String})
    uId: string
}
