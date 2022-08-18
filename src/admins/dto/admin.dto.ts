import { ApiProperty } from "@nestjs/swagger";

export class AdminDto {
    @ApiProperty({type: Number})
    aId: number;
    @ApiProperty({type: String})
    email: string
    @ApiProperty({type: String})
    password: string
}