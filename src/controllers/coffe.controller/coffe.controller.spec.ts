/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http');
import { CoffeController } from './coffe.controller';
import { CoffeService } from '../../services/coffe.service/coffe.service';
import { faker } from '@faker-js/faker';
import { Coffe } from '../../entity/coffe';
import { CoffeUpdateDto } from '../../dto/coffeUpdateDto';
import { BeansClass, CookingMethod, Country, DegreeOfRoasting, ProcessingType } from '../../dto/coffe.dto';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RoleGuard } from '../../guard/role.guard/role.guard';
import { JwtModule } from '@nestjs/jwt';
class CoffeServiceFake {
   
    public async create(coffe: Coffe): Promise<void> {
         return;
     }
   
     async findAll(): Promise<Coffe[]> {
       return [] as Coffe[];
     }
   
     async findOne(id: string): Promise<Coffe> {
       return {} as Coffe;
     }
   
    public async update(id: string, updatedcoffe: CoffeUpdateDto): Promise<void> {
       return;
     }
   
     async remove(id: string): Promise<void> {
         return;
     }
   
     }
describe('CoffeController', () => { 
    let coffeService: CoffeService;
    let coffeController: CoffeController;
    const img_url = faker.lorem.word();
    const coffeId = faker.string.uuid();
    const description = faker.lorem.sentences();
    const creator_id =  faker.string.uuid();
    const updateCoffeData: CoffeUpdateDto = {
        name: 'fii',
        price: 450,
    };
    const coffe = {
        id: coffeId,
        img_url: img_url,
        name: 'fii',
        price: 450,
        description: description,
        beansClass: BeansClass.PREMIUM,
        creator_id: creator_id,
        cookingMethod: CookingMethod.CEZVA,
        degreeOfRoasting: DegreeOfRoasting.LIGHT,
        country: Country.CO,
        processingType: ProcessingType.MIXED,
    };
    const coffeDto = {
        img_url: img_url,
        name: 'fii',
        price: 450,
        description: description,
        beansClass: BeansClass.PREMIUM,
        cookingMethod: CookingMethod.CEZVA,
        degreeOfRoasting: DegreeOfRoasting.LIGHT,
        country: Country.CO,
        processingType: ProcessingType.MIXED,
    };
    const mockRequest = httpMocks.createRequest();

    
    mockRequest.user = { sub: creator_id, role: 'user' };
   
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                  global: true,
                  secret: 'JWT_ACCESS_TOKEN_SECRET',
                  signOptions: { expiresIn: '2d' },
                }),
                PassportModule.register({
                  defaultStrategy: 'jwt',
                  property: 'user',
                  session: false,
                }),
              ],
            providers: [
                CoffeController,
                {
                    provide: CoffeService,
                    useClass: CoffeServiceFake,
                },
                {
                    provide: AuthGuard,
                    useValue: jest.fn().mockImplementation(() => true),
                },
                {
                    provide: RoleGuard,
                    useValue: jest.fn().mockImplementation(() => true),
                },
            ],
        }).compile();
    
        coffeService = module.get<CoffeService>(CoffeService);
        coffeController = module.get<CoffeController>(CoffeController);
    });   
it('should be defined', async () => {
    expect(coffeController).toBeDefined();
  });

    it('should create a coffe', async () => {
        const coffeServiceCreateSpy = jest
        .spyOn(coffeService, 'create')
        .mockResolvedValue(coffe);
        const result = await coffeController.create(coffeDto, mockRequest)  
        expect(coffeServiceCreateSpy).toHaveBeenCalledWith(coffeDto,creator_id);
        expect(coffeServiceCreateSpy).toBeCalledTimes(1);
    });

    it('should get coffe', async () => {
        const coffeServiceFindOneSpy = jest.spyOn(coffeService, 'findOne').mockResolvedValue(coffe);
        const result = await coffeController.findOne(coffeId);
        expect(coffeServiceFindOneSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeServiceFindOneSpy).toBeCalledTimes(1);
    });

    it('should update a coffe', async () => {
        const coffeServiceUpdateSpy = jest
        .spyOn(coffeService, 'update')
        .mockResolvedValue(coffe);
        const result = await coffeController.update(coffeId, updateCoffeData);
        expect(coffeServiceUpdateSpy).toHaveBeenCalledWith(coffeId, updateCoffeData);
        expect(coffeServiceUpdateSpy).toBeCalledTimes(1);
    });

    it('should delete a coffe', async () => {
        const coffeServiceRemoveSpy = jest
        .spyOn(coffeService, 'remove');
        await coffeController.remove(coffeId);
        expect(coffeServiceRemoveSpy).toHaveBeenCalledWith(coffeId);
        expect(coffeServiceRemoveSpy).toBeCalledTimes(1);
    });
    
});