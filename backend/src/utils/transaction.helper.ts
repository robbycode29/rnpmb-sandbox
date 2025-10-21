import { DataSource, QueryRunner } from 'typeorm';

export async function withTransaction<T>(
  dataSource: DataSource,
  callback: (queryRunner: QueryRunner) => Promise<T>,
): Promise<T> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result = await callback(queryRunner);
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    console.error('Error during transaction, rolling back...', error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }

  return Promise.resolve(undefined as unknown as T);
}
