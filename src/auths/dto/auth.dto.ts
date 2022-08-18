import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({type: String})
    uId: string
    @ApiProperty({type: String})
    email: string
    @ApiProperty({type: String})
    displayName: string;
    @ApiProperty({type: String})
    provider: string;
}
