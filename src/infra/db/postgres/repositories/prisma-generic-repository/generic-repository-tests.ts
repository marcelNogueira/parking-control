import { MockFactoryInterface } from '@/domain/factories/generic/mock-factory-interface'
import { GenericRepository } from './generic-repository'
export interface BaseModel {
  id: number
}
export interface GenericRepositorySutModel<BaseT extends BaseModel, AddT, UpdateT> {
  mockFactory: MockFactoryInterface<BaseT, AddT, UpdateT>
  repository: GenericRepository<BaseT, AddT, UpdateT>
}

export class GenericRepositoryTests<BaseT extends BaseModel, AddT, UpdateT> {
  genericAddTestSuite = (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>) => {
    return () => {
      test(`Should return a valid ${sut.repository.tableName} with id on success`, async () =>
        await this.genericAddTest(sut))
      test(`Should add a ${sut.repository.tableName} on success`, async () =>
        await this.genericAddReturnsValidTest(sut))
    }
  }

  genericDeleteTestSuite = (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>) => {
    return () => {
      test(`Should delete a ${sut.repository.tableName} on success`, async () => await this.genericDeleteTest(sut))
    }
  }

  genericUpdateTestSuite = (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>) => {
    return () => {
      test(`Should update a ${sut.repository.tableName} on success`, async () => await this.genericUpdateTest(sut))
    }
  }

  genericGetTestSuite = (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>) => {
    return () => {
      test(`Should return a ${sut.repository.tableName} on success`, async () => await this.genericGetTest(sut))
    }
  }

  genericGetAllTestSuite = (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>) => {
    return () => {
      test(`Should return all ${sut.repository.tableName}s on success`, async () => await this.genericGetAllTest(sut))
    }
  }

  genericAddTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const obj = sut.mockFactory.makeMockAddModel()
    const addedObj = await sut.repository.add(sut.mockFactory.makeMockAddModel())
    const objFromDb = await sut.repository.get(addedObj.id)

    Object.keys(obj).forEach((key) => {
      expect(objFromDb[key]).toEqual(obj[key])
    })

    expect(addedObj.id).toBeTruthy()
    await sut.repository.delete(addedObj.id)
  }

  genericAddReturnsValidTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const obj = sut.mockFactory.makeMockAddModel()
    const addedObj = await sut.repository.add(obj)
    Object.keys(obj).forEach((key) => {
      expect(addedObj[key]).toEqual(obj[key])
    })

    await sut.repository.delete(addedObj.id)
  }

  genericUpdateTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const obj = await sut.repository.add(sut.mockFactory.makeMockAddModel())
    const objToUpdate = sut.mockFactory.makeMockUpdateModel()
    const { id, ...updatedObj } = await sut.repository.update(obj.id, objToUpdate)
    /* Objeto não deve ter seu id trocado em um update */
    expect(id).toEqual(obj.id)
    /* Todos os campos do objeto enviado após o update devem ser iguais aos recebidos */
    Object.keys(objToUpdate)
      .forEach((key) => {
        expect(updatedObj[key]).toEqual(objToUpdate[key])
    })

    await sut.repository.delete(id)
  }

  genericDeleteTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const obj = await sut.repository.add(sut.mockFactory.makeMockAddModel())
    await sut.repository.delete(obj.id)
    const objCheck = await sut.repository.get(obj.id)
    expect(objCheck).toBeFalsy()
  }

  genericGetTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const obj = await sut.repository.add(sut.mockFactory.makeMockAddModel())
    const objFromDb = await sut.repository.get(obj.id)
    expect(obj).toEqual(objFromDb)

    await sut.repository.delete(obj.id)
  }

  genericGetAllTest = async (sut: GenericRepositorySutModel<BaseT, AddT, UpdateT>): Promise<void> => {
    const mockObjects = sut.mockFactory.makeMockAddModelArray()
    const addedObj1 = await sut.repository.add(mockObjects[0])
    const addedObj2 = await sut.repository.add(mockObjects[1])
    const objsFromDb = await sut.repository.getAll()
    expect(objsFromDb).toContainEqual(addedObj1)
    expect(objsFromDb).toContainEqual(addedObj2)

    await sut.repository.delete(addedObj1.id)
    await sut.repository.delete(addedObj2.id)
  }
}
