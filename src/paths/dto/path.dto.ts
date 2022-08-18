import { ApiProperty } from "@nestjs/swagger";

export class GeneratePathDto {
    @ApiProperty({type: String})
    eId: string
    @ApiProperty({type: Number})
    path: number
    @ApiProperty({type: String})
    start: string
}

export class PathDto {}