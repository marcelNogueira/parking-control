import { GenericAddRepository, GenericDeleteRepository, GenericGetAllRepository, GenericGetRepository, GenericUpdateRepository } from '@/data/protocols/db/generic'
import { QueryFilters } from '@/presentation/helpers/types'
import { PrismaClient } from '@prisma/client'
/**
 * T: BaseModel
 * U: AddModel
 * V: UpdateModel
 */
export abstract class GenericRepository<BaseT, AddT, UpdateT>
  implements 
    GenericAddRepository<BaseT, AddT>,
    GenericDeleteRepository<BaseT>,
    GenericGetRepository<BaseT>,
    GenericGetAllRepository<BaseT>,
    GenericUpdateRepository<BaseT, UpdateT> {
  tableName: string
  protected prisma = new PrismaClient()

  protected async executeQuery(queryType: string, options = {}): Promise<any> {
    try {
      return (await this.prisma[this.tableName][queryType](options))
    } catch (error) {
      console.log(error)
    } finally {
      this.prisma.$disconnect()
    }
  }

  async delete(id: number): Promise<BaseT> {
    if (!this.tableName) {
      throw new Error('tableName not set')
    }
    const response = await this.executeQuery('delete', { where: { id }});
    return response;
  }

  async get(id: number, params: QueryFilters = {}): Promise<BaseT> {
      if (!this.tableName) {
        throw new Error('tableName not set')
      }
      const response = await this.executeQuery('findUnique', { where: { id, ...params }});
      return response;
  }

  async update(id: number, object: UpdateT): Promise<BaseT> {
    if (!this.tableName) {
      throw new Error('tableName not set')
    }
    const response = await this.executeQuery('update', { where: { id }, data: object});
    return response;
  }

  async add(object: AddT): Promise<BaseT> {
      if (!this.tableName) {
        throw new Error('tableName not set')
      }
      const response = await this.executeQuery('create', { data: object });
      return response;
  }

  async getAll(filters: QueryFilters = {}): Promise<BaseT[]> {
    if (!this.tableName) {
      throw new Error('tableName not set')
    }
    const response = await this.executeQuery('findMany', { where: filters });
    return response as BaseT[];
  }

  async deleteAll(filter = {}) {
    // console.log('deleting')
    return await this.executeQuery('deleteMany', { where: filter});
  }
}
