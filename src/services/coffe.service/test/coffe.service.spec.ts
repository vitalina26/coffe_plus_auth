/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CoffeService } from '../coffe.service';
import { HttpException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Coffe } from '../../../entity/coffe';
import { CoffeUpdateDto } from '../../../dto/coffeUpdateDto';
import { CoffeRepossitory } from '../../../repositories/coffe-repository';
import { BeansClass, CookingMethod, Country, DegreeOfRoasting, ProcessingType } from '../../../dto/coffe.dto';

class CoffeRepositoryFake {
   
 public async createCoffe(coffe: Coffe): Promise<void> {
      return;
  }

  async findAll(): Promise<Coffe[]> {
    return [] as Coffe[];
  }

  async findOnebyId(id: string): Promise<Coffe> {
    return {} as Coffe;
  }

 public async updateCoffe(id: string, updatedcoffe: CoffeUpdateDto): Promise<void> {
    return;
  }

  async removeCoffe(id: string): Promise<void> {
      return;
  }

  }
  
  describe('CoffeService', () => {
    let coffeService: CoffeService;
    let coffeRepository: CoffeRepossitory;
    const coffeId = faker.string.uuid();
    const coffe = {
      id: coffeId,
      img_url: faker.lorem.word(),
      name: 'fii',
      price: 450,
      description: faker.lorem.sentences(),
      beansClass: BeansClass.PREMIUM,
      creator_id: faker.string.uuid(),
      cookingMethod: CookingMethod.CEZVA,
      degreeOfRoasting: DegreeOfRoasting.LIGHT,
      country: Country.CO,
      processingType: ProcessingType.MIXED,
    };
    const updateCoffeData: CoffeUpdateDto = {
      name: 'fii',
      price: 450,
    };
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CoffeService,
          {
            provide: CoffeRepossitory,
            useClass: CoffeRepositoryFake,
          },
        ],
      }).compile();
  
      coffeService = module.get(CoffeService);
      coffeRepository = module.get<CoffeRepossitory>(CoffeRepossitory);
    });
  
    describe('updating a coffe', () => {
      it('calls the repository with correct paramaters', async () => {
      
        const coffeRepositoryFindOneByIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(coffe);
  
        const coffeRepositoryUpdateSpy = jest
          .spyOn(coffeRepository, 'updateCoffe')
        
        const result = await coffeService.update(coffeId, updateCoffeData);
   
        expect(coffeRepositoryFindOneByIdSpy).toHaveBeenCalledWith(
          coffeId,
        );
        expect(coffeRepositoryFindOneByIdSpy).toBeCalledTimes(2);
        expect(coffeRepositoryUpdateSpy).toHaveBeenCalledWith(coffeId, updateCoffeData );
        expect(result).toEqual(coffe);
      });

      it('throws an error when a coffe doesnt exist', async () => {
       
        const coffeRepositoryFindOneIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(null);
  
        expect.assertions(4);
  
        try {
          await coffeService.update(coffeId, updateCoffeData);
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
          expect(e.message).toBe('NotFound');
        }
  
        expect(coffeRepositoryFindOneIdSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryFindOneIdSpy).toBeCalledTimes(1);
      });
    });
    describe('deleting a coffe ', () => {
      it('deleting existed coffe', async () => {
        const coffeRepositoryFindOneByIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(coffe);
  
        const coffeRepositoryDeleteSpy = jest
          .spyOn(coffeRepository, 'removeCoffe');
        
        await coffeService.remove(coffeId);
        expect(coffeRepositoryFindOneByIdSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryFindOneByIdSpy).toBeCalledTimes(1);
        expect(coffeRepositoryDeleteSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryDeleteSpy).toBeCalledTimes(1);
      });

      it('throws an error when coffe we try to delete doesnt exist', async () => {
        const coffeRepositoryFindOneIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(null);
  
        expect.assertions(4);
  
        try {
          await coffeService.remove(coffeId);
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
          expect(e.message).toBe('NotFound');
        }
  
        expect(coffeRepositoryFindOneIdSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryFindOneIdSpy).toBeCalledTimes(1);
      });
    });
    describe('finding a coffe ', () => {
      it('returning existed coffe', async () => {
   
        const coffeRepositoryFindOneByIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(coffe);
        
        const result  = await coffeService.findOne(coffeId);
        expect(coffeRepositoryFindOneByIdSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryFindOneByIdSpy).toBeCalledTimes(1);
        expect(result).toEqual(coffe);
      });

      it('throws an error when coffe we try to get by id doesnt exist', async () => {
        const coffeRepositoryFindOneIdSpy = jest
          .spyOn(coffeRepository, 'findOnebyId')
          .mockResolvedValue(null);
  
        expect.assertions(4);
  
        try {
          await coffeService.findOne(coffeId);
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
          expect(e.message).toBe('NotFound');
        }
  
        expect(coffeRepositoryFindOneIdSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeRepositoryFindOneIdSpy).toBeCalledTimes(1);
      });
    });
  });