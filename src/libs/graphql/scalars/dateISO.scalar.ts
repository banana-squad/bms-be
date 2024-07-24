import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateISO', () => Date)
export class DateISOScalar implements CustomScalar<string, Date> {
  name = 'Date';
  description = 'ISO 8601 date format';

  serialize(value: Date): string {
    return value.toISOString();
  }

  parseValue(value: number): Date {
    return new Date(value);
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) return new Date(ast.value);

    return null;
  }
}
